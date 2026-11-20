import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Helper to check authorization
function isAuthorized(req: NextRequest) {
  const incomingPassword = req.headers.get('x-admin-password')
  const expectedPassword = process.env.ADMIN_PASSWORD || 'zaynahsadmin123'
  return incomingPassword === expectedPassword
}

// 1. GET ALL LEADS + ANALYTICS STATS
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
  }

  try {
    // Fetch all leads from the DB
    const leads = await prisma.posLead.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Compute stats
    const totalLeads = leads.length
    const pendingLeads = leads.filter(l => l.status === 'pending').length
    const contactedLeads = leads.filter(l => l.status === 'contacted').length
    const installedLeads = leads.filter(l => l.status === 'installed').length
    const cancelledLeads = leads.filter(l => l.status === 'cancelled').length

    return NextResponse.json({
      success: true,
      leads,
      stats: {
        totalLeads,
        pendingLeads,
        contactedLeads,
        installedLeads,
        cancelledLeads,
      }
    })
  } catch (error: any) {
    console.error('Error fetching admin leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads from database', details: error?.message || String(error) },
      { status: 500 }
    )
  }
}

// 2. UPDATE LEAD STATUS or NOTES
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { id, status, notes } = body

    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required' }, { status: 400 })
    }

    // Build update data
    const updateData: any = {}
    if (status !== undefined) {
      updateData.status = status
    }
    if (notes !== undefined) {
      updateData.notes = notes
    }

    const updatedLead = await prisma.posLead.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({
      success: true,
      lead: updatedLead,
      message: 'Lead updated successfully'
    })
  } catch (error: any) {
    console.error('Error updating lead:', error)
    return NextResponse.json(
      { error: 'Failed to update lead', details: error?.message || String(error) },
      { status: 500 }
    )
  }
}

// 3. DELETE LEAD
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Lead ID is required for deletion' }, { status: 400 })
    }

    await prisma.posLead.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Lead deleted successfully'
    })
  } catch (error: any) {
    console.error('Error deleting lead:', error)
    return NextResponse.json(
      { error: 'Failed to delete lead from database', details: error?.message || String(error) },
      { status: 500 }
    )
  }
}
