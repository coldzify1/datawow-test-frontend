import { useEffect, useState } from "react";

export default function useIsMobile(){
  const [isMobile,setIsMobile] = useState(false);
  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth < 768);
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  return isMobile;
}