import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Header from '@/components/profile/Header'
import ProfileDetails from '@/components/profile/ProfileDetails'

async function getProfileData() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    
    if (!accessToken) {
      redirect('/');
    }

    const decoded = jwtDecode(accessToken);
    const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    
    if (!role) {
      redirect('/');
    }

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(`${API_BASE_URL}/api/${role}/profile/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return {
      success: true,
      data: response.data,
      user: {
        role: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        userId: decoded.userId,
        firstName: decoded.firstName,
        lastName: decoded.lastName
      }
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    
    if (error.response?.status === 401) {
      redirect('/');
    }
    
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to load profile data',
      user: null
    };
  }
}

const UserProfile = async () => {
  const profileResult = await getProfileData();

  if (!profileResult.success) {
    redirect('/');
  }

  return (
    <div className='w-full'>
      <Header title="Ayarlar" />
      <ProfileDetails 
        initialData={profileResult.data} 
        user={profileResult.user}
      />
    </div>
  );
};

export default UserProfile