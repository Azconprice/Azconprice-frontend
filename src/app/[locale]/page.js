import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Partners from '@/components/Home/Partners'
import Aboutus from '@/components/Home/Aboutus'
import React from 'react'
import OurSollutions from '@/components/Home/OurSollutions'
import Faq from '@/components/Home/Faq'
const page = async () => {
  const t = await getTranslations()

  return (
    <>
      <container>
        <Aboutus />
        <OurSollutions />
        <Partners />
        <Faq />
      </container>
    </>
  )
}

export default page
