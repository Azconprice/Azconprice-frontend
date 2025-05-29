import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Partners from '@/components/Home/Partners'
import Aboutus from '@/components/Home/Aboutus'
import React from 'react'
import OurSollutions from '@/components/Home/OurSollutions'
import Faq from '@/components/Home/Faq'
import HeaderSection from '@/components/Home/HeaderSection'
const page = async () => {
  const t = await getTranslations()

  return (
    <>
        <Aboutus />
        <OurSollutions />
        <Partners />
        <Faq />
    </>
  )
}

export default page
