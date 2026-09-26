import React from 'react'
import { AdminHeader } from './admin-header'

export default function layout({children}:{children: React.ReactElement}) {
  return (
        <main className="min-h-svh bg-paper">
      <AdminHeader />
        <main className='mt-8 md:mt-16'>

        {children}
        </main>
    </main>
  )
}
