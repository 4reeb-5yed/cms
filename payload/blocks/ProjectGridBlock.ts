import { Block } from 'payload'

export const ProjectGridBlock: Block = {
  slug: 'projectGrid',
  fields: [
    { name: 'heading', type: 'text' },
    { name: 'filterByTag', type: 'text', admin: { description: 'Optional: filter by tech stack tag' } },
    { name: 'limit', type: 'number', defaultValue: 6 },
  ],
}
