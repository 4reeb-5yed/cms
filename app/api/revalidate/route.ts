import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (!path) {
    return NextResponse.json({ message: 'Missing path parameter' }, { status: 400 })
  }

  try {
    revalidatePath(path)
    return NextResponse.json({ revalidated: true, path })
  } catch (error) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
