import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import blog from './blog'
import codeBlock from './codeBlock'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, blog, codeBlock],
}
