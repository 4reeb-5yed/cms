"use client"
import { Block, Project } from '@/types'
import { HeroBlock, RichTextBlock, ProjectGridBlock, ImageGalleryBlock, TimelineBlock, ContactFormBlock, CustomEmbedBlock } from '@/components/blocks'

interface BlockRendererProps {
  blocks: Block[]
  projects?: Project[]
}

export function BlockRenderer({ blocks, projects = [] }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <>
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={index} {...block} />
          case 'richText':
            return <RichTextBlock key={index} {...block} />
          case 'projectGrid':
            return <ProjectGridBlock key={index} {...block} projects={projects} />
          case 'imageGallery':
            return <ImageGalleryBlock key={index} {...block} />
          case 'timeline':
            return <TimelineBlock key={index} {...block} />
          case 'contactForm':
            return <ContactFormBlock key={index} {...block} />
          case 'customEmbed':
            return <CustomEmbedBlock key={index} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
