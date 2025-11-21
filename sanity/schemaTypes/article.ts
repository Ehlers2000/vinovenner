import { type SchemaTypeDefinition } from 'sanity'

export const article: SchemaTypeDefinition = {
  name: 'article',
  title: 'Article / Guide',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (Rule) => Rule.required().max(300),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      placeholder: '8 min',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Lær at smage', value: 'Lær at smage' },
          { title: 'Køb bedre', value: 'Køb bedre' },
          { title: 'Vin & mad', value: 'Vin & mad' },
          { title: 'Rejser', value: 'Rejser' },
          { title: 'Producenter', value: 'Producenter' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
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
    {
      name: 'relatedVideos',
      title: 'Related Videos',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'video' }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'heroImage',
    },
    prepare({ title, author, media }: any) {
      return {
        title,
        subtitle: author,
        media,
      }
    },
  },
}

