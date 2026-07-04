import { CollectionConfig } from 'payload'
import { revalidateProject } from '../hooks/revalidate'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'publishedDate'],
  },
  hooks: {
    afterChange: [revalidateProject],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'summary', type: 'textarea', required: true, admin: { description: 'Brief description shown in project cards' } },
    { name: 'techStack', type: 'text', hasMany: true, admin: { description: 'Technologies used (press Enter to add)' } },
    { name: 'liveUrl', type: 'text', admin: { description: 'Deployed URL (optional)' } },
    { name: 'repoUrl', type: 'text', admin: { description: 'Repository URL (optional)' } },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { description: 'Show on home page featured section' } },
    { name: 'publishedDate', type: 'date', required: true },
    {
      name: 'body',
      type: 'blocks',
      blocks: [
        { slug: 'hero', fields: [
          { name: 'heading', type: 'text', required: true },
          { name: 'subheading', type: 'text' },
          { name: 'image', type: 'upload', relationTo: 'media' },
          { name: 'ctaLabel', type: 'text', label: 'CTA Button Label' },
          { name: 'ctaLink', type: 'text', label: 'CTA Button Link' },
        ]},
        { slug: 'richText', fields: [
          { name: 'content', type: 'richText' },
        ]},
        { slug: 'imageGallery', fields: [
          { name: 'images', type: 'upload', relationTo: 'media', hasMany: true, required: true },
          { name: 'layout', type: 'select', options: ['grid', 'strip'], defaultValue: 'grid' },
        ]},
        { slug: 'timeline', fields: [
          { name: 'items', type: 'array', fields: [
            { name: 'year', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ]},
        ]},
        { slug: 'customEmbed', fields: [
          { name: 'html', type: 'textarea', required: true },
          { name: 'caption', type: 'text' },
        ]},
      ],
    },
  ],
}
