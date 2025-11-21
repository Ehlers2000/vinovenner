import { type SchemaTypeDefinition } from 'sanity'

export const event: SchemaTypeDefinition = {
  name: 'event',
  title: 'Event / Smagning',
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
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      placeholder: '18:30',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'endTime',
      title: 'End Time',
      type: 'string',
      placeholder: '21:30',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Smagning', value: 'smagning' },
          { title: 'Middag', value: 'middag' },
          { title: 'Rejse', value: 'rejse' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (DKK)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'seats',
      title: 'Total Seats',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'seatsLeft',
      title: 'Seats Left',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'ticketUrl',
      title: 'Ticket URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Event Image',
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
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'wines',
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
      name: 'program',
      title: 'Program',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'soldOut',
      title: 'Sold Out',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare({ title, date, media }: any) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString('da-DK') : '',
        media,
      }
    },
  },
}

