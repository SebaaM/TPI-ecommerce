import { useState, useEffect } from "react";

export function useFetch(url, options = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Delay simula 2 segundos en responder
        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]); // importante para evitar efectos colaterales

  return {
    data,
    loading,
    error,
  };
}
