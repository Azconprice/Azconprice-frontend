import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Partners from '@/components/Home/Partners'
import Aboutus from '@/components/Home/Aboutus'
import React from 'react'
import OurSollutions from '@/components/Home/OurSollutions'
import Faq from '@/components/Home/Faq'
import PlanPaymentModal from '@/components/modals/ProductsCaculation/PlanPaymentModal'
import Guide from '@/components/Home/Guide'
import ContactForm from '@/components/Home/ContactForm'

const page = async () => {
  const t = await getTranslations()

  return (
    <>
      <main className='max-w-[1300px] mx-auto'>
        <Aboutus />
        <Guide />
        <OurSollutions />
        <Partners />
        <ContactForm />
        <Faq />
      </main>

    </>
  )
}

export default page
