# Fieldnote Portfolio Platform

A self-managed content platform built with Next.js and Payload CMS. The portfolio is the first content served by a general-purpose publishing engine, not a fixed set of pages.

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database connection string
   ```

3. Initialize the database:
   ```bash
   npm run db:push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the CMS admin at 

## Architecture

The platform follows a headless CMS pattern:

- **CMS Admin**: Payload CMS for content management
- **Content API**: REST/GraphQL endpoint from Payload
- **Frontend**: Next.js App Router with static generation and ISR

### Content Model

- **Pages**: Generic pages built from composable blocks
- **Projects**: Case studies with cover images, tech stack, and rich content
- **Navigation**: Auto-populated from pages with `showInNav: true`
- **Site Settings**: Global site configuration

### Block Types

- HeroBlock
- RichTextBlock
- ProjectGridBlock
- ImageGalleryBlock
- TimelineBlock
- ContactFormBlock
- CustomEmbedBlock

## Design System

The "Fieldnote" design system uses:
- **Colors**: ink, stone, charcoal, ember, moss, brass
- **Typography**: Instrument Serif (display), General Sans (body), JetBrains Mono (meta)
- **Spacing**: 4px base unit scale

See  for complete specifications.

## Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### CMS (Railway/Render/Fly.io)

1. Deploy Payload CMS
2. Set DATABASE_URI and PAYLOAD_SECRET
3. Configure webhook to point to your Vercel deployment

## License

MIT
# Portfolio site
