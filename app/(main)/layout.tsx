import { SiteFooter, SiteHeader } from '@/components/home'
import React from 'react'

export default function layout({children}:{children: React.ReactElement}) {
  return (
    <div className="flex min-h-full flex-col overflow-x-hidden bg-paper text-[16px] leading-[1.6] text-ink sm:text-[17px]">
      <SiteHeader />
    {children}
          <SiteFooter />
    </div>

  )
}
