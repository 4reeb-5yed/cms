import { CollectionAfterChangeHook } from 'payload'

export const revalidatePage: CollectionAfterChangeHook = async ({ doc, req: { payload } }) => {
  const slug = doc.slug === '/' ? '' : doc.slug
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate?path=/${slug}&secret=${process.env.REVALIDATE_SECRET}`)
  } catch (e) {
    console.error('Revalidation error:', e)
  }
  return doc
}

export const revalidateProject: CollectionAfterChangeHook = async ({ doc }) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate?path=/projects/${doc.slug}&secret=${process.env.REVALIDATE_SECRET}`)
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate?path=/projects&secret=${process.env.REVALIDATE_SECRET}`)
  } catch (e) {
    console.error('Revalidation error:', e)
  }
  return doc
}

export const revalidateNav: CollectionAfterChangeHook = async () => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/revalidate?path=/&secret=${process.env.REVALIDATE_SECRET}`)
  } catch (e) {
    console.error('Revalidation error:', e)
  }
  return
}
