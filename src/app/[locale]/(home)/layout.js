import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const fetchSpecializations = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Specialization/all`, {
      cache: 'force-cache'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch specializations');
    }
    const data = await response.json();
    return data
      .filter(specialization => specialization.id && specialization.name)
      .map((specialization, index) => ({
        value: specialization.id,
        label: specialization.name,
        key: `specialization-${specialization.id}-${index}`
      }));
  } catch (error) {
    console.error('Error fetching specializations:', error);
    return [];
  }
};

export default async function HomeLayout({ children }) {
  const specializations = await fetchSpecializations();
  
  return (
    <>
      <Navbar specializations={specializations} />
      {children}
      <Footer />
    </>
  );
} 