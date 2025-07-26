import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function GET() {
  try {
    const projects = await client.fetch(`
      *[_type == "project"] | order(order asc) {
        _id,
        title,
        description,
        "imageUrl": image.asset->url,
        technologies,
        githubUrl,
        liveUrl,
        order,
        featured
      }
    `)

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
} 