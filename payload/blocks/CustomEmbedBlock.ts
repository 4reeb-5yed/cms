import { Block } from 'payload'

export const CustomEmbedBlock: Block = {
  slug: 'customEmbed',
  fields: [
    { name: 'html', type: 'textarea', required: true, admin: { description: 'Embed code (iframe, script, etc.)' } },
    { name: 'caption', type: 'text' },
  ],
}
