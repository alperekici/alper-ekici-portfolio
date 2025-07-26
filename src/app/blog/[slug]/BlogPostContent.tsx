'use client'

import { PortableText } from '@portabletext/react'
import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-html'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-sql'

interface BlogPostContentProps {
  content: any[]
}

// Code block component for PortableText
const CodeBlock = ({ value }: { value: any }) => {
  const { code, language, filename } = value

  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  return (
    <div className="my-6">
      {filename && (
        <div className="bg-gray-800 text-gray-300 px-4 py-2 rounded-t-lg border-b border-gray-700 font-mono text-sm">
          {filename}
        </div>
      )}
      <pre className="bg-gray-800 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
        <code className={`language-${language}`}>
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