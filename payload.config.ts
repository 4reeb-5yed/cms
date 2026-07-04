import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { Projects } from './payload/collections/Projects'
import { Navigation } from './payload/collections/Navigation'
import { SiteSettings } from './payload/collections/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: { titleSuffix: '- Fieldnote Portfolio' },
  },
  editor: slateEditor({}),
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI! } }),
  upload: { limits: { fileSize: 5000000 } },
  collections: [Users, Media, Pages, Projects, Navigation, SiteSettings],
  secret: process.env.PAYLOAD_SECRET!,
  typescript: { outputFile: path.resolve(dirname, 'types.generated.ts') },
})
