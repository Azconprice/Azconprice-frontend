import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Partners from '@/components/Home/Partners'
import React from 'react'

const page = async () => {
  const t = await getTranslations()

  return (
   <>
   <Partners/>
   </>
  )
}

export default page
