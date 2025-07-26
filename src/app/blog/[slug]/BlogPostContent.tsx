'use client'

import { PortableText } from '@portabletext/react'

interface CodeBlockValue {
  code: string
  language: string
  filename?: string
}

interface PortableTextContent {
  _type: string
  [key: string]: unknown
}

interface BlogPostContentProps {
  content: PortableTextContent[]
}

// Code block component for PortableText
const CodeBlock = ({ value }: { value: CodeBlockValue }) => {
  const { code, filename } = value

  return (
    <div className="my-6">
      {filename && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-t-lg border-b border-gray-700 font-mono text-sm">
          {filename}
        </div>
      )}
      <pre className="bg-gray-800 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
        <code className="text-sm">
          {code}
        </code>
      </pre>
    </div>
  )
}

// PortableText components configuration
const components = {
  types: {
    codeBlock: CodeBlock,
  },
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <div className="prose prose-invert max-w-none">
      <PortableText value={content} components={components} />
    </div>
  )
} 