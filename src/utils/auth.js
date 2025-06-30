import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken") || Cookies.get("accessToken");
  }
  return null;
};

export const getRefreshToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refreshToken") || Cookies.get("refreshToken");
  }
  return null;
};

export const isAuthenticated = () => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  return !!(accessToken || refreshToken);
};

export const saveTokens = (accessToken, refreshToken) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    Cookies.set("accessToken", accessToken, { 
      expires: 1, 
      secure: true, 
      sameSite: "strict" 
    });
    Cookies.set("refreshToken", refreshToken, { 
      expires: 7, 
      secure: true, 
      sameSite: "strict" 
    });
  }
};

export const decodeToken = (token) => {
  if (!token) return null;
  
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const extractUserDetails = (decodedToken) => {
  if (!decodedToken) return null;
  
  return {
    email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    userId: decodedToken.userId,
    firstName: decodedToken.firstName,
    lastName: decodedToken.lastName,
    role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
    exp: decodedToken.exp,
    iss: decodedToken.iss,
    aud: decodedToken.aud
  };
};

export const saveUserDetails = (userDetails) => {
  if (typeof window !== "undefined" && userDetails) {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }
};

export const getUserDetails = () => {
  if (typeof window !== "undefined") {
    const userDetails = localStorage.getItem("userDetails");
    return userDetails ? JSON.parse(userDetails) : null;
  }
  return null;
};

export const clearUserDetails = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userDetails");
  }
};

export const saveTokensAndUserDetails = (accessToken, refreshToken) => {
  if (typeof window !== "undefined") {
    saveTokens(accessToken, refreshToken);
    
    const decodedToken = decodeToken(accessToken);
    if (decodedToken) {
      const userDetails = extractUserDetails(decodedToken);
      saveUserDetails(userDetails);
      return userDetails;
    }
  }
  return null;
};

export const clearTokens = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    clearUserDetails();

    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }
};

export const getAuthHeader = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  
  const decodedToken = decodeToken(token);
  if (!decodedToken || !decodedToken.exp) return true;
  
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

export const getCurrentUser = () => {
  const accessToken = getAccessToken();
  
  if (!accessToken || isTokenExpired(accessToken)) {
    return null;
  }
  
  const storedUserDetails = getUserDetails();
  if (storedUserDetails) {
    return storedUserDetails;
  }
  
  const decodedToken = decodeToken(accessToken);
  if (decodedToken) {
    const userDetails = extractUserDetails(decodedToken);
    saveUserDetails(userDetails);
    return userDetails;
  }
  
  return null;
}; 