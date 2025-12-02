// Fetch par obtener datos de un producto en especifico
import { useFetch } from "./useFetch";

const API_URL = import.meta.env.VITE_API_URL;

export function useFetchProduct(id) {
  const url = `${API_URL}/products/` + (id ? `${id}/` : "");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer elias",
    },
  };

  return useFetch(url, options);
}
