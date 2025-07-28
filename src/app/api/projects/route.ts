import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

interface SanityProject {
  _id?: string
  title?: {
    tr?: string
    en?: string
  }
  description?: {
    tr?: string
    en?: string
  }
  imageUrl?: string
  technologies?: string[]
  githubUrl?: string
  liveUrl?: string
  order?: number
  featured?: boolean
}

interface CleanedProject {
  _id: string
  title: {
    tr: string
    en: string
  }
  description: {
    tr: string
    en: string
  }
  imageUrl: string | null
  technologies: string[]
  githubUrl: string | null
  liveUrl: string | null
  order: number
  featured: boolean
}

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
    const cleanedProjects: CleanedProject[] = projects.map((project: SanityProject) => ({
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