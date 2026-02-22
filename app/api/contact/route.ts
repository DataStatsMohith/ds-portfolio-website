import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    const data = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'mohith.sekharamahanthi.2002@gmail.com',
      subject: `New message from ${name}`,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to send' }, { status: 500 })
  }
}