"use client"

interface RichTextBlockProps {
  content: any
}

export function RichTextBlock({ content }: RichTextBlockProps) {
  if (!content || (Array.isArray(content) && content.length === 0)) {
    return null
  }

  const renderContent = (nodes: any[]): string => {
    if (!nodes || !Array.isArray(nodes)) return ''
    
    return nodes.map(node => {
      if (typeof node === 'string') return node
      
      const text = node.text || ''
      const children = node.children?.map((child: any) => child.text || '').join('') || text
      
      switch (node.type) {
        case 'h2': return `<h2>${children}</h2>`
        case 'h3': return `<h3>${children}</h3>`
        case 'blockquote': return `<blockquote>${children}</blockquote>`
        case 'link': return `<a href="${node.url}">${children}</a>`
        case 'ul': return `<ul>${node.children?.map((li: any) => `<li>${li.children?.map((c: any) => c.text || '').join('')}</li>`).join('') || ''}</ul>`
        case 'ol': return `<ol>${node.children?.map((li: any) => `<li>${li.children?.map((c: any) => c.text || '').join('')}</li>`).join('') || ''}</ol>`
        default: return text ? `<p>${text}</p>` : ''
      }
    }).join('')
  }

  return (
    <section className="block-spacing">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reading-width mx-auto">
          <div 
            className="prose prose-lg text-ink leading-[1.7] [&_h2]:font-display [&_h2]:text-3xl [&_h2]:mb-4 [&_h2]:mt-12 [&_h3]:font-display [&_h3]:text-2xl [&_h3]:mb-3 [&_h3]:mt-8 [&_p]:mb-4 [&_a]:text-ember [&_a]:underline [&_a:hover]:no-underline [&_ul]:mb-4 [&_ul_li]:mb-2 [&_ol]:mb-4 [&_ol_li]:mb-2 [&_blockquote]:border-l-4 [&_blockquote]:border-brass [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-ink/70"
            dangerouslySetInnerHTML={{ __html: renderContent(content) }}
          />
        </div>
      </div>
    </section>
  )
}
