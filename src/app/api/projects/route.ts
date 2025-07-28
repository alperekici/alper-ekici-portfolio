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

    // Null check ve veri temizleme
    const cleanedProjects = projects.map((project: any) => ({
      _id: project._id || '',
      title: {
        tr: project.title?.tr || 'Untitled Project',
        en: project.title?.en || 'Untitled Project'
      },
      description: {
        tr: project.description?.tr || 'No description available',
        en: project.description?.en || 'No description available'
      },
      imageUrl: project.imageUrl || null,
      technologies: project.technologies || [],
      githubUrl: project.githubUrl || null,
      liveUrl: project.liveUrl || null,
      order: project.order || 1,
      featured: project.featured || false
    }))

    return NextResponse.json(cleanedProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
} 