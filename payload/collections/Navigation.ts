import { CollectionConfig } from 'payload'
import { revalidateNav } from '../hooks/revalidate'

export const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    description: 'Controls the main navigation bar. Pages with "showInNav" enabled are auto-added.',
  },
  hooks: {
    afterChange: [revalidateNav],
  },
  fields: [
    { name: 'items', type: 'array', fields: [
      { name: 'label', type: 'text', required: true },
      { name: 'linkType', type: 'select', options: [
        { label: 'Internal Page', value: 'page' },
        { label: 'Internal Project', value: 'project' },
        { label: 'External URL', value: 'external' },
      ], required: true },
      { name: 'page', type: 'relationship', relationTo: 'pages', admin: { condition: (_, siblingData) => siblingData.linkType === 'page' } },
      { name: 'project', type: 'relationship', relationTo: 'projects', admin: { condition: (_, siblingData) => siblingData.linkType === 'project' } },
      { name: 'externalUrl', type: 'text', admin: { condition: (_, siblingData) => siblingData.linkType === 'external' } },
    ]},
  ],
}
