import CompanyProducts from '@/components/profile/CompanyProducts'
import Header from '@/components/profile/Header'
import React from 'react'

const ProductsPage = () => {
    return (
        <div className='w-full'>
            <Header title="Şirkət məhsulları" />
            <CompanyProducts />
        </div>
    )
}

export default ProductsPage