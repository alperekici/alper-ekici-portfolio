import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Python', value: 'python' },
          { title: 'C++', value: 'cpp' },
          { title: 'C#', value: 'csharp' },
          { title: 'JSON', value: 'json' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'Bash', value: 'bash' },
          { title: 'SQL', value: 'sql' },
          { title: 'Plain Text', value: 'text' },
        ],
      },
      initialValue: 'javascript',
    }),
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      code: 'code',
      language: 'language',
      filename: 'filename',
    },
    prepare(selection) {
      const { code, language, filename } = selection
      const preview = code ? code.slice(0, 50) + (code.length > 50 ? '...' : '') : 'No code'
      return {
        title: filename || `${language} code`,
        subtitle: preview,
      }
    },
  },
}) 