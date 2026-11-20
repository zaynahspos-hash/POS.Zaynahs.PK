import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getResend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { shopName, ownerName, phoneNumber, email, businessType, city } = body

    if (!shopName || !ownerName || !phoneNumber || !businessType) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      )
    }

    // Insert lead into DB via Prisma
    const lead = await prisma.posLead.create({
      data: {
        shopName,
        ownerName,
        phoneNumber,
        email: email || null,
        businessType,
        city: city || null,
        status: 'pending',
      },
    })

    console.log('Lead created in DB:', lead.id)

    const resend = getResend()
    const adminEmail = process.env.ADMIN_EMAIL || 'zaynahspos@gmail.com'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'pipeline@zaynahspos.com'

    // Try sending admin alert email
    try {
      await resend.emails.send({
        from: `Zaynahs Pipeline <${fromEmail}>`,
        to: adminEmail,
        subject: `🚨 New Installation Request: ${shopName}`,
        html: `
          <div style="font-family: sans-serif; background: #0A0A0A; color: #fff; padding: 24px; border-radius: 12px; border: 1px solid #10B981;">
            <h2 style="color: #10B981; margin-top: 0;">🎯 New Lead Captured!</h2>
            <hr style="border-color: #222;" />
            <p><strong>Shop Name:</strong> ${shopName}</p>
            <p><strong>Owner Name:</strong> ${ownerName}</p>
            <p><strong>WhatsApp Phone:</strong> ${phoneNumber}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Business Type:</strong> ${businessType}</p>
            <p><strong>City:</strong> ${city || 'Not provided'}</p>
            <p style="margin-top: 24px;">
              <a href="https://wa.me/${phoneNumber.replace(/\D/g, '')}" 
                 style="display: inline-block; padding: 12px 24px; background: #10B981; color: #000; text-decoration: none; border-radius: 30px; font-weight: bold;">
                💬 Contact on WhatsApp
              </a>
            </p>
          </div>
        `,
      })
    } catch (err) {
      console.error('Failed to send admin notification email:', err)
    }

    // Try sending customer welcome email if email is provided
    if (email) {
      try {
        const demoUrl = process.env.NEXT_PUBLIC_DEMO_URL || 'https://demo.zaynahspos.com'
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'welcome@zaynahspos.com'
        
        await resend.emails.send({
          from: `Zaynahs POS <${fromEmail}>`,
          to: email,
          subject: '🎁 Welcome to Zaynahs POS — Demo Credentials Inside!',
          html: `
            <div style="font-family: sans-serif; background: #0A0A0A; color: #fff; padding: 32px; border-radius: 16px; border: 1px solid #10B981; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #10B981; margin: 0 0 16px 0; font-size: 28px; text-transform: uppercase;">Zaynahs POS</h1>
              <p style="font-size: 16px; line-height: 1.6;">Dear ${ownerName},</p>
              <p style="font-size: 16px; line-height: 1.6;">Thank you for registering and booking your POS installation for <strong>${shopName}</strong>! Our engineering team will contact you shortly to configure your system.</p>
              
              <div style="background: #121212; padding: 24px; border-radius: 12px; margin: 24px 0; border: 1px solid rgba(255,255,255,0.05);">
                <h3 style="color: #10B981; margin: 0 0 16px 0; font-size: 18px; text-transform: uppercase; letter-spacing: 1px;">🔑 Live Demo Credentials</h3>
                <p style="margin: 6px 0; font-size: 14px;"><strong>URL:</strong> <a href="${demoUrl}" style="color: #10B981; text-decoration: underline;">${demoUrl}</a></p>
                <p style="margin: 6px 0; font-size: 14px;"><strong>DEMO EMAIL:</strong> ${process.env.DEMO_ACCOUNT_EMAIL || 'demo@zaynahspos.com'}</p>
                <p style="margin: 6px 0; font-size: 14px;"><strong>PASSWORD:</strong> ${process.env.DEMO_ACCOUNT_PASSWORD || 'demo12345'}</p>
              </div>
              
              <p style="text-align: center; margin-top: 32px;">
                <a href="${demoUrl}" 
                   style="display: inline-block; padding: 14px 28px; background: #10B981; color: #000; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px; text-transform: uppercase;">
                  🚀 Launch Demo Now
                </a>
              </p>
              <p style="font-size: 12px; color: #666; margin-top: 40px; text-align: center;">ZaynahsPOS © 2026. All rights reserved.</p>
            </div>
          `,
        })
      } catch (err) {
        console.error('Failed to send customer welcome email:', err)
      }
    }

    return NextResponse.json({ success: true, leadId: lead.id })
  } catch (error: any) {
    console.error('Lead submission endpoint error:', error)
    return NextResponse.json(
      { error: 'Failed to submit lead', details: error?.message || String(error) },
      { status: 500 }
    )
  }
}
