import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'object',
      fields: [
        {
          name: 'tr',
          title: 'Turkish',
          type: 'array',
          of: [
            { type: 'block' },
            { type: 'image' },
            { type: 'codeBlock' }
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [
            { type: 'block' },
            { type: 'image' },
            { type: 'codeBlock' }
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.tr',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title.tr',
      media: 'featuredImage',
      publishedAt: 'publishedAt',
    },
    prepare(selection) {
      const { title, media, publishedAt } = selection
      return {
        title,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString('tr-TR') : 'No date',
        media,
      }
    },
  },
}) 