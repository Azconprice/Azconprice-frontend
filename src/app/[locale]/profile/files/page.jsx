import Files from '@/components/profile/Files'
import Header from '@/components/profile/Header'
import React from 'react'

const FilesPage = () => {
    return (
        <div className='w-full'>
            <Header title="Göndərilmiş fayllar" />
            <Files />
        </div>
    )
}

export default FilesPage