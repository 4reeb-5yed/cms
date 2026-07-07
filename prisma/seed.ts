import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.contactMessage.deleteMany()
  await prisma.project.deleteMany()
  await prisma.page.deleteMany()
  await prisma.media.deleteMany()
  await prisma.siteSettings.deleteMany()

  // Create site settings
  await prisma.siteSettings.create({
    data: {
      id: 'singleton',
      siteTitle: 'Areeb Syed',
      tagline: 'Applied AI • Cybersecurity • Systems Engineering',
      footerText: '© 2024 Areeb Syed. Building intelligence-oriented security tooling.',
      socialLinks: JSON.stringify([
        { platform: 'github', url: 'https://github.com/4reeb-5yed' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/areeb-syed-b19491245' },
        { platform: 'email', url: 'mailto:areeb.syed1@outlook.com' }
      ])
    }
  })

  // Create media records
  const media1 = await prisma.media.create({
    data: {
      url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
      alt: 'AI platform interface',
      filename: 'interviewiq.jpg'
    }
  })

  const media2 = await prisma.media.create({
    data: {
      url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
      alt: 'Cybersecurity platform',
      filename: 'phishing.jpg'
    }
  })

  const media3 = await prisma.media.create({
    data: {
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop',
      alt: 'Cryptography tool',
      filename: 'cipher.jpg'
    }
  })

  // Create projects
  await prisma.project.create({
    data: {
      title: 'InterviewIQ',
      slug: 'interviewiq',
      summary: 'AI-powered career intelligence platform for evidence-based résumé analysis, ATS evaluation, and interview preparation.',
      coverImageId: media1.id,
      techStack: ['Python', 'AI/ML', 'NLP', 'FastAPI', 'LangGraph'],
      liveUrl: 'https://interview-iq-areeb-syed.vercel.app',
      repoUrl: 'https://github.com/4reeb-5yed/InterviewIQ',
      featured: true,
      publishedDate: new Date('2024-06-15'),
      category: 'AI/ML',
      metaTitle: 'InterviewIQ',
      metaDescription: 'AI-powered career intelligence platform',
      challenges: 'Creating an accurate ATS evaluation system that can analyze resumes against job descriptions and provide actionable feedback. Ensuring the AI understands context and nuances in professional experiences.',
      solution: 'Built a multi-layer NLP pipeline that parses resumes, extracts key skills and experiences, and compares them against job requirements. Integrated with OpenAI for intelligent feedback generation.',
      outcome: 'Helps job seekers understand their resume performance and improve their chances of passing ATS screening.',
      gallery: JSON.stringify([]),
      body: JSON.stringify([])
    }
  })

  await prisma.project.create({
    data: {
      title: 'Phishing Simulator',
      slug: 'phishing-simulator',
      summary: 'AI-powered phishing simulation and cybersecurity awareness platform with Gemini API integration.',
      coverImageId: media2.id,
      techStack: ['React', 'Express.js', 'MongoDB', 'Gemini API', 'JavaScript'],
      liveUrl: 'https://fish-sail.onrender.com',
      repoUrl: 'https://github.com/4reeb-5yed/Phishing_Simulator',
      featured: true,
      publishedDate: new Date('2024-04-20'),
      category: 'Cybersecurity',
      metaTitle: 'Phishing Simulator',
      metaDescription: 'AI-powered cybersecurity awareness platform',
      challenges: 'Creating realistic phishing templates that test employee awareness while ensuring the simulation is ethical and educational. Integrating AI for dynamic content generation.',
      solution: 'Built a comprehensive phishing template system with AI-generated scenarios. Implemented detailed tracking and reporting for organizations to measure security awareness.',
      outcome: 'Organizations can train employees to recognize phishing attempts and measure improvement over time.',
      gallery: JSON.stringify([]),
      body: JSON.stringify([])
    }
  })

  await prisma.project.create({
    data: {
      title: 'Caesar Cipher Pro',
      slug: 'caesar-cipher-tool',
      summary: 'Cryptographic analysis platform for automated Caesar cipher detection and statistical frequency analysis.',
      coverImageId: media3.id,
      techStack: ['React', 'Vite', 'Chi-squared Analysis'],
      liveUrl: 'https://caesar-cipher-pro.netlify.app',
      repoUrl: 'https://github.com/4reeb-5yed/caesar-cipher-tool',
      featured: true,
      publishedDate: new Date('2024-02-10'),
      category: 'Security Tools',
      metaTitle: 'Caesar Cipher Tool',
      metaDescription: 'Automated cryptographic analysis platform',
      challenges: 'Developing an algorithm that can efficiently crack Caesar ciphers of varying lengths and languages. Balancing accuracy with computational efficiency.',
      solution: 'Implemented multiple attack strategies including brute force, frequency analysis, and pattern matching using chi-squared statistical analysis.',
      outcome: 'Educational tool that demonstrates cryptographic concepts and automated cryptanalysis techniques.',
      gallery: JSON.stringify([]),
      body: JSON.stringify([])
    }
  })

  // Create pages
  await prisma.page.create({
    data: {
      title: 'Home',
      slug: '/',
      showInNav: false,
      navOrder: 0,
      blocks: JSON.stringify([
        {
          blockType: 'hero',
          heading: 'Building intelligent systems',
          subheading: 'Applied AI • Cybersecurity • Systems Engineering. Building intelligence-oriented security tooling and analytical platforms.',
          ctaLabel: 'View Projects',
          ctaLink: '/projects'
        }
      ])
    }
  })

  await prisma.page.create({
    data: {
      title: 'About',
      slug: 'about',
      showInNav: true,
      navOrder: 2,
      metaTitle: 'About - Areeb Syed',
      metaDescription: 'Learn more about Areeb Syed - Applied AI and Cybersecurity developer at MIT World Peace University.',
      blocks: JSON.stringify([
        {
          blockType: 'richText',
          content: `<p>I'm <strong>Areeb Syed</strong>, a student at MIT World Peace University pursuing Analytics & Artificial Intelligence. I'm passionate about building intelligence-oriented security tooling, analytical cryptographic systems, and offensive-simulation infrastructure.</p>
<p>My work focuses on the intersection of AI and cybersecurity, where I develop tools that help organizations strengthen their security posture through simulated attacks and intelligent analysis. I'm particularly interested in automated security assessment and AI-powered threat detection.</p>`
        }
      ])
    }
  })

  await prisma.page.create({
    data: {
      title: 'Contact',
      slug: 'contact',
      showInNav: true,
      navOrder: 3,
      metaTitle: 'Contact - Areeb Syed',
      metaDescription: 'Get in touch with Areeb Syed for AI, cybersecurity, or collaboration opportunities.',
      blocks: JSON.stringify([
        {
          blockType: 'contactForm',
          heading: 'Get in Touch',
          description: 'Interested in AI, cybersecurity, or systems engineering? Let\'s connect.'
        }
      ])
    }
  })

  await prisma.page.create({
    data: {
      title: 'Projects',
      slug: 'projects',
      showInNav: true,
      navOrder: 1,
      metaTitle: 'Projects - Areeb Syed',
      metaDescription: 'A collection of projects spanning AI, cybersecurity, and security tools.',
      blocks: JSON.stringify([
        {
          blockType: 'projectGrid',
          heading: 'Selected Work',
          description: 'A collection of projects spanning web applications, mobile apps, and design systems.'
        }
      ])
    }
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
