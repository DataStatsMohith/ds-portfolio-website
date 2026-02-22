import { Resend } from "resend"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "Email service not configured" },
      { status: 500 }
    )
  }

  const resend = new Resend(apiKey)

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