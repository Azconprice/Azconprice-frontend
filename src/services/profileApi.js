import axios from 'axios';
import { getCurrentUser, getAuthHeader } from '@/utils/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getProfileEndpoint = () => {
  const user = getCurrentUser();
  if (!user || !user.role) {
    throw new Error('User not authenticated or role not found');
  }

  const role = user.role.toLowerCase();
  return `${API_BASE_URL}/api/${role}/profile/me`;
};

export const getProfile = async () => {
  try {
    const endpoint = getProfileEndpoint();
    const headers = getAuthHeader();

    const response = await axios.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);

    if (error.response?.status === 401) {
      throw new Error('Authentication required. Please login again.');
    } else if (error.response?.status === 404) {
      throw new Error('Profile not found.');
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to fetch profile data.');
    }
  }
};

export const updateProfile = async (profileData) => {
  try {
    const endpoint = getProfileEndpoint();
    const headers = getAuthHeader();

    const formData = new FormData();

    if (profileData.firstName) {
      formData.append('FirstName', profileData.firstName);
    }
    if (profileData.lastName) {
      formData.append('LastName', profileData.lastName);
    }
    if (profileData.email) {
      formData.append('Email', profileData.email);
    }
    if (profileData.address) {
      formData.append('Address', profileData.address);
    }
    if (profileData.phoneNumber) {
      formData.append('PhoneNumber', profileData.phoneNumber);
    }
    formData.append('ProfilePicture', profileData.profilePicture);

    const response = await axios.patch(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);

    if (error.response?.status === 401) {
      throw new Error('Authentication required. Please login again.');
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data?.message || 'Invalid profile data.');
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to update profile.');
    }
  }
};

export const updatePassword = async (passwordData) => {
  try {
    const user = getCurrentUser();
    if (!user || !user.role) {
      throw new Error('User not authenticated or role not found');
    }

    const role = user.role.toLowerCase();
    const endpoint = `${API_BASE_URL}/api/${role}/profile/change-password`;
    const headers = getAuthHeader();

    const requestBody = {
      oldPassword: passwordData.oldPassword,
      newPassword: passwordData.newPassword,
      confirmNewPassword: passwordData.confirmNewPassword
    };

    const response = await axios.put(endpoint, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);

    if (error.response?.status === 401) {
      throw new Error('Authentication required. Please login again.');
    } else if (error.response?.status === 400) {
      throw new Error(error.response.data?.message || 'Invalid password data.');
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to update password.');
    }
  }
};

export const deleteProfile = async () => {
  try {
    const endpoint = getProfileEndpoint();
    const headers = getAuthHeader();

    const response = await axios.delete(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting profile:', error);

    if (error.response?.status === 401) {
      throw new Error('Authentication required. Please login again.');
    } else if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Failed to delete profile.');
    }
  }
};

