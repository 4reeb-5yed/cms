import { CollectionConfig } from 'payload'
import { revalidatePage } from '../hooks/revalidate'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'showInNav', 'navOrder'],
  },
  hooks: {
    afterChange: [revalidatePage],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, admin: { description: 'URL path (e.g. "about" for /about)' } },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    { name: 'showInNav', type: 'checkbox', defaultValue: true, admin: { description: 'Show this page in navigation' } },
    { name: 'navOrder', type: 'number', defaultValue: 0, admin: { description: 'Order in navigation (lower = first)' } },
    {
      name: 'blocks',
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
        { slug: 'projectGrid', fields: [
          { name: 'heading', type: 'text' },
          { name: 'filterByTag', type: 'text' },
          { name: 'limit', type: 'number', defaultValue: 6 },
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
        { slug: 'contactForm', fields: [
          { name: 'heading', type: 'text' },
        ]},
        { slug: 'customEmbed', fields: [
          { name: 'html', type: 'textarea', required: true },
          { name: 'caption', type: 'text' },
        ]},
      ],
    },
  ],
}
