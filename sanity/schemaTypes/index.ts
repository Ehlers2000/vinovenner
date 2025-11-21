import { type SchemaTypeDefinition } from 'sanity'
import { wine } from './wine'
import { event } from './event'
import { video } from './video'
import { article } from './article'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [wine, event, video, article],
}
