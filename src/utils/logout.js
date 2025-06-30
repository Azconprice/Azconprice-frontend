import { clearTokens } from "./auth";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    clearTokens();
    
    router.push('/');
    
    console.log('Successfully logged out');
  };

  return logout;
};

export const logoutUser = () => {
  clearTokens();
  
  if (typeof window !== "undefined") {
    window.location.href = '/';
  }
}; 