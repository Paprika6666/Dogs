import { useEffect, useState } from "react";

export const useDebounce = (searchQuery, delay=500) => {
    const [debounceValue, setDebounceValue] = useState (searchQuery);
    console.log ({ searchQuery});
  
    useEffect(() => {
      const timeout = setTimeout (() => {
        setDebounceValue (searchQuery);
      }, delay);
  
  console.log ({timeout});
  
      return () => clearTimeout(timeout);
      }, [searchQuery]);
      return debounceValue;
    };