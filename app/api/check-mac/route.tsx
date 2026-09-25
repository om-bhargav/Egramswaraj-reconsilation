import { NextRequest } from 'next/server'

// Length of the free trial window granted from a machine's first request.
const TRIAL_WINDOW_MS = 48 * 60 * 60 * 1000

type VerifyBody = {
  mac_address?: unknown
}

export async function POST(request: NextRequest) {
  let body: VerifyBody

  try {
    body = await request.json()
  } catch {
    return Response.json(
      { success: false, message: 'Invalid JSON body' },
      { status: 400 }
    )
  }

  const mac = typeof body.mac_address === 'string' ? body.mac_address.trim() : ''

  if (!mac) {
    return Response.json(
      { success: false, message: 'mac_address is required' },
      { status: 400 }
    )
  }

  console.log('[check-mac] licence request from', mac)

  // ---------------------------------------------------------------------------
  // Real licence check — enable once the Records table / DB client is wired up.
  //
  // const record = await db.records.findFirst({ where: { mac_address: mac } })
  //
  // // Machine has never contacted us: start its trial clock now.
  // if (!record) {
  //   await db.records.create({
  //     data: { mac_address: mac, purchased: false, first_request_at: new Date() },
  //   })
  //   return Response.json({ success: true, message: 'Trial started' })
  // }
  //
  // // Paid machines are always allowed.
  // if (record.purchased) {
  //   return Response.json({ success: true, message: 'Licence active' })
  // }
  //
  // // Unpaid: allow only while inside the 48 hour trial window.
  // const firstRequestAt = new Date(record.first_request_at).getTime()
  // const withinTrial = Date.now() - firstRequestAt < TRIAL_WINDOW_MS
  //
  // if (withinTrial) {
  //   return Response.json({ success: true, message: 'Trial active' })
  // }
  //
  // return Response.json({ success: false, message: 'Your limit is expired' })
  // ---------------------------------------------------------------------------

  // Placeholder until the table lookup above is enabled.
  return Response.json({ success: true, message: 'Licence verified', mac_address: mac })
}
