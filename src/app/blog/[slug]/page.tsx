import { client } from '@/sanity/lib/client'
import { notFound } from 'next/navigation'
import BlogPostContent from './BlogPostContent'

interface BlogPost {
  _id: string
  title: {
    tr: string
    en: string
  }
  excerpt: {
    tr: string
    en: string
  }
  content: {
    tr: any[]
    en: any[]
  }
  featuredImageUrl?: string
  slug: string
  publishedAt: string
  tags?: string[]
}

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await client.fetch(`
    *[_type == "blog"] {
      slug
    }
  `)

  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }))
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const post = await client.fetch(`
    *[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      excerpt,
      content,
      "featuredImageUrl": featuredImage.asset->url,
      "slug": slug.current,
      publishedAt,
      tags
    }
  `, { slug })

  return post
}

export default async function BlogPost({ params }: Props) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  // Dil seçimi için basit bir yaklaşım (gerçek uygulamada context kullanılabilir)
  const language = 'tr' // Varsayılan olarak Türkçe

  return (
    <article className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {post.featuredImageUrl && (
          <div className="mb-8">
            <img
              src={post.featuredImageUrl}
              alt={post.title[language]}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-blue-400">
            {post.title[language]}
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            {post.excerpt[language]}
          </p>
          <div className="flex items-center gap-4 text-gray-500">
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString(
                language === 'tr' ? 'tr-TR' : 'en-US'
              )}
            </time>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <BlogPostContent content={post.content[language]} />
      </div>
    </article>
  )
} 