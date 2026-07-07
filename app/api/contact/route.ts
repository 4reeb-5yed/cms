import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Store message in database
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || '',
        message
      }
    })

    // Try to send email if SMTP is configured
    const smtpHost = process.env.SMTP_HOST
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const contactEmail = process.env.CONTACT_EMAIL || 'areeb.syed1@outlook.com'

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_PORT === '465',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      })

      try {
        await transporter.sendMail({
          from: `"Portfolio Contact" <${smtpUser}>`,
          to: contactEmail,
          replyTo: email,
          subject: subject ? `Portfolio: ${subject}` : 'New message from portfolio',
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
          html: `
            <h2>New message from portfolio</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `
        })
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Email failed but message was saved - still return success
      }
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
