import { type SchemaTypeDefinition } from 'sanity'

export const video: SchemaTypeDefinition = {
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'The ID from the YouTube URL (e.g., dQw4w9WgXcQ)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'runtime',
      title: 'Runtime (formatted)',
      type: 'string',
      placeholder: '12:30',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'runtimeMinutes',
      title: 'Runtime (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Smagning', value: 'Smagning' },
          { title: 'Bag kulissen', value: 'Bag kulissen' },
          { title: 'Rejse', value: 'Rejse' },
          { title: 'Læring', value: 'Læring' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hero',
      title: 'Feature as Hero Video',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'relatedWines',
      title: 'Related Wines',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'wine' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      runtime: 'runtime',
      publishedAt: 'publishedAt',
    },
    prepare({ title, runtime, publishedAt }: any) {
      return {
        title,
        subtitle: `${runtime || ''} • ${publishedAt ? new Date(publishedAt).toLocaleDateString('da-DK') : ''}`,
      }
    },
  },
}

