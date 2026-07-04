import { CollectionConfig } from 'payload'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Settings',
    description: 'Global site configuration',
  },
  fields: [
    { name: 'siteTitle', type: 'text', required: true },
    { name: 'tagline', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'select', options: [
          { label: 'GitHub', value: 'github' },
          { label: 'Twitter', value: 'twitter' },
          { label: 'LinkedIn', value: 'linkedin' },
          { label: 'Dribbble', value: 'dribbble' },
          { label: 'Instagram', value: 'instagram' },
        ], required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    { name: 'defaultSeoImage', type: 'upload', relationTo: 'media' },
    { name: 'footerText', type: 'text' },
  ],
}
