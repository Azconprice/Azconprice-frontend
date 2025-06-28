import Header from '@/components/profile/Header'
import ProfileDetails from '@/components/profile/ProfileDetails'
import React from 'react'

const UserProfile = () => {
  return (
    <div className='w-full'>
        <Header title="Ayarlar" />
        <ProfileDetails />
    </div>
  )
}

export default UserProfile