import ChangePassword from '@/components/profile/ChangePassword'
import Header from '@/components/profile/Header'
import React from 'react'

const Security = () => {
  return (
    <div className='w-full'>
        <Header title="Ayarlar" />
        <ChangePassword />
        
    </div>
  )
}

export default Security