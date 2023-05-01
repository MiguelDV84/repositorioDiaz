import { useState, useEffect, useCallback } from "react";

const useLocalStorage = (key, initialValue = null) => {
  // Estado local para almacenar el valor
  const [value, setStoredValue] = useState(() => {
    // Comprobamos si ya hay un valor almacenado en localStorage
    const storedValue = localStorage.getItem(key);
    console.log({ key, initialValue, storedValue });
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Actualizar el valor en localStorage cuando cambia
  const setValue = useCallback(( value) => {
    if(value){
      console.log({value, key})
      setStoredValue(value);
      localStorage.setItem(key,JSON.stringify(value));
    }
  }, [key, value]);
  return [value, setValue];
};

export default useLocalStorage;
