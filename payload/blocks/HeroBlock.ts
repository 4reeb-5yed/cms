import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'ctaLabel', type: 'text', label: 'CTA Button Label' },
    { name: 'ctaLink', type: 'text', label: 'CTA Button Link' },
  ],
}
