import { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timeline',
  fields: [
    { name: 'items', type: 'array', fields: [
      { name: 'year', type: 'text', required: true },
      { name: 'title', type: 'text', required: true },
      { name: 'description', type: 'textarea' },
    ]},
  ],
}
