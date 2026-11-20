import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Quick, low-cost query to wake up and verify Supabase database connection
    const leadCount = await prisma.posLead.count()
    
    return NextResponse.json(
      {
        status: 'healthy',
        database: 'connected',
        recordsCount: leadCount,
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Database connection keep-alive error:', error)
    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'disconnected',
        error: error.message || 'Unknown database error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
