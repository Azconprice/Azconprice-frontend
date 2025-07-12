import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Applications from '@/components/profile/Applications'
import Header from '@/components/profile/Header'
import React from 'react'

async function getApplicationsData() {
  try {
    const cookieStore = await cookies();
    // console.log(cookieStore)
    const accessToken = cookieStore.get('accessToken')?.value;
    
    if (!accessToken) {
      redirect('/');
    }

    
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(`${API_BASE_URL}/api/Request/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });


    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.log(error)
    if (error.response?.status === 401) {
      redirect('/');
    }
    
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to load applications data',
      data: null
    };
  }
}

const ApplicationsPage = async () => {
  const applicationsResult = await getApplicationsData();

  if (!applicationsResult.success) {
    redirect('/');
  }

  return (
    <div className='w-full'>
        <Header title="Müraciətlər" />
        <Applications initialData={applicationsResult.data} />
    </div>
  )
}

export default ApplicationsPage 