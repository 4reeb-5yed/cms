import { Block } from 'payload'

export const ImageGalleryBlock: Block = {
  slug: 'imageGallery',
  fields: [
    { name: 'images', type: 'upload', relationTo: 'media', hasMany: true, required: true },
    { name: 'layout', type: 'select', options: ['grid', 'strip'], defaultValue: 'grid' },
  ],
}
