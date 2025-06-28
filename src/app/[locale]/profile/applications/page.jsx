import Applications from '@/components/profile/Applications'
import Header from '@/components/profile/Header'
import React from 'react'

const ApplicationsPage = () => {
  return (
    <div className='w-full'>
        <Header title="Müraciətlər" />
        <Applications />
    </div>
  )
}

export default ApplicationsPage