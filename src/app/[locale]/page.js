import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import React from 'react'

const page = async () => {
  const t = await getTranslations()

  return (
    <div>
      <h1>{t("home.title")}</h1>
    </div>
  )
}

export default page