import { type SchemaTypeDefinition } from 'sanity'

export const wine: SchemaTypeDefinition = {
  name: 'wine',
  title: 'Wine',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      description: 'Unique identifier (e.g., dupont-pinot-noir-2021)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(1900).max(2100),
    },
    {
      name: 'producer',
      title: 'Producer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'region',
      title: 'Region',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Rød', value: 'rød' },
          { title: 'Hvid', value: 'hvid' },
          { title: 'Rosé', value: 'rosé' },
          { title: 'Mousserende', value: 'mousserende' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'grapes',
      title: 'Grapes',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'priceTier',
      title: 'Price Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Under 150 kr.', value: 'under150' },
          { title: '150 – 250 kr.', value: '150-250' },
          { title: '250 – 400 kr.', value: '250-400' },
          { title: 'Over 400 kr.', value: 'over400' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'styleTags',
      title: 'Style Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Frisk', value: 'frisk' },
          { title: 'Fyldig', value: 'fyldig' },
          { title: 'Mineralsk', value: 'mineralsk' },
          { title: 'Saftig', value: 'saftig' },
          { title: 'Krydret', value: 'krydret' },
          { title: 'Let', value: 'let' },
          { title: 'Struktureret', value: 'struktureret' },
        ],
      },
    },
    {
      name: 'occasions',
      title: 'Occasions',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hverdagsvin', value: 'hverdagsvin' },
          { title: 'Fest', value: 'fest' },
          { title: 'Gave', value: 'gave' },
          { title: 'Hyggeaften', value: 'hyggeaften' },
          { title: 'Til maden', value: 'madparring' },
          { title: 'Oplevelse', value: 'oplevelse' },
        ],
      },
    },
    {
      name: 'shortNote',
      title: 'Short Note',
      type: 'text',
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: 'longNote',
      title: 'Long Note',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'recommendation',
      title: 'Recommendation',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'foodPairing',
      title: 'Food Pairing',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tasteIcons',
      title: 'Taste Icons',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Frugt', value: 'frugt' },
          { title: 'Syre', value: 'syre' },
          { title: 'Fad', value: 'fad' },
          { title: 'Tannin', value: 'tannin' },
          { title: 'Mineral', value: 'mineral' },
          { title: 'Blomst', value: 'blomst' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'affiliate',
      title: 'Affiliate / Webshop Link',
      type: 'object',
      fields: [
        {
          name: 'label',
          title: 'Button Label',
          type: 'string',
          placeholder: 'Køb hos Husted',
        },
        {
          name: 'url',
          title: 'Webshop URL',
          type: 'url',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'partner',
          title: 'Partner Name',
          type: 'string',
          placeholder: 'Husted Vin',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Wine Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Important for accessibility and SEO',
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'videoId',
      title: 'Related Video ID',
      type: 'string',
    },
    {
      name: 'score',
      title: 'Score (0-100)',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(100),
    },
    {
      name: 'inAnbefalinger',
      title: 'Vis i Anbefalinger',
      type: 'boolean',
      description: 'Skal denne vin vises på anbefalinger-siden?',
      initialValue: false,
    },
    {
      name: 'inLeksikon',
      title: 'Vis i Leksikon',
      type: 'boolean',
      description: 'Skal denne vin vises i leksikonet? (Vine i anbefalinger vises automatisk også i leksikon)',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      media: 'image',
    },
    prepare({ title, year, media }: any) {
      return {
        title: `${title} ${year}`,
        media,
      }
    },
  },
}

