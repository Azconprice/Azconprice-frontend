import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import Partners from '@/components/Home/Partners'
import Aboutus from '@/components/Home/Aboutus'
import React from 'react'
import OurSollutions from '@/components/Home/OurSollutions'

const page = async () => {
  const t = await getTranslations()

  return (
   <>
   <container>

  
   <Aboutus/>
 
   <OurSollutions/>
     <Partners/>
      </container>
   </>
  )
}

export default page
