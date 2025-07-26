import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

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

    return NextResponse.json(blogPosts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
} 