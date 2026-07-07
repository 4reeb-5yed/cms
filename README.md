# Fieldnote Portfolio Platform

A self-managed content platform built with Next.js and PostgreSQL. The portfolio is the first content served by a general-purpose publishing engine, not a fixed set of pages.

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or any Prisma-supported database)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your settings:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `ADMIN_PASSWORD`: Password for CMS admin access
   - `SESSION_SECRET`: A random string for session encryption (32+ chars)
   - `NEXT_PUBLIC_SITE_URL`: Your site's URL for OpenGraph metadata
   - `CONTACT_EMAIL`: Email address for contact form submissions
   - SMTP settings (optional): For sending emails from the contact form

3. Initialize the database schema:
   ```bash
   npm run db:push
   ```

4. Seed the database with sample data:
   ```bash
   npm run db:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Access the CMS admin at `http://localhost:3000/admin/login`

### Database Commands

- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio GUI

## Architecture

The platform follows a headless CMS pattern with Prisma ORM:

- **CMS Admin**: Custom admin panel at `/admin`
- **Content API**: REST endpoints at `/api/projects`, `/api/pages`, `/api/settings`
- **Frontend**: Next.js App Router with server components

### Content Model

- **Pages**: Generic pages with title, slug, navigation settings, and SEO metadata
- **Projects**: Case studies with cover images, tech stack, project details, and rich content
- **Site Settings**: Global site configuration (title, tagline, footer, social links)
- **Contact Messages**: Messages submitted through the contact form

## Design System

The "Fieldnote" design system uses:
- **Colors**: ink, stone, charcoal, ember, moss, brass
- **Typography**: Instrument Serif (display), General Sans (body), JetBrains Mono (meta)
- **Spacing**: 4px base unit scale

See `portfolio-platform-design-system.md` for complete specifications.

## Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
   - `NEXT_PUBLIC_SITE_URL`
   - SMTP settings (optional)
4. Deploy

### Database

The database should be hosted separately (e.g., Supabase, Railway, Neon, etc.) and the connection string provided via `DATABASE_URL`.

## Security

- `/admin` routes are protected by authentication
- All API routes require valid session cookies
- Environment variables are used for all secrets
- CSRF protection via SameSite cookies
- Input validation on all forms

## License

MIT

