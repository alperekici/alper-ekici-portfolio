import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

interface SanityBlogPost {
  _id?: string
  title?: {
    tr?: string
    en?: string
  }
  excerpt?: {
    tr?: string
    en?: string
  }
  featuredImageUrl?: string
  slug?: string
  publishedAt?: string
  tags?: string[]
  order?: number
  featured?: boolean
}

interface CleanedBlogPost {
  _id: string
  title: {
    tr: string
    en: string
  }
  excerpt: {
    tr: string
    en: string
  }
  featuredImageUrl: string | null
  slug: string
  publishedAt: string
  tags: string[]
  order: number
  featured: boolean
}

export async function GET() {
  try {
    const blogPosts = await client.fetch(`
      *[_type == "blog"] | order(order asc) {
        _id,
        title,
        excerpt,
        "featuredImageUrl": featuredImage.asset->url,
        "slug": slug.current,
        publishedAt,
        tags,
        order,
        featured
      }
    `)

    // Null check ve veri temizleme
    const cleanedBlogPosts: CleanedBlogPost[] = blogPosts.map((post: SanityBlogPost) => ({
      _id: post._id || '',
      title: {
        tr: post.title?.tr || 'Untitled Post',
        en: post.title?.en || 'Untitled Post'
      },
      excerpt: {
        tr: post.excerpt?.tr || 'No excerpt available',
        en: post.excerpt?.en || 'No excerpt available'
      },
      featuredImageUrl: post.featuredImageUrl || null,
      slug: post.slug || '',
      publishedAt: post.publishedAt || new Date().toISOString(),
      tags: post.tags || [],
      order: post.order || 1,
      featured: post.featured || false
    }))

    return NextResponse.json(cleanedBlogPosts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
} 