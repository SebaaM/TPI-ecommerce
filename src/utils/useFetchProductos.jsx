// hooks/useFetchCategoria.js
import { useFetch } from "./useFetch";

const API_URL = import.meta.env.VITE_API_URL;

export function useFetchProductos() {
  const url = `${API_URL}/products/`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer elias",
    },
  };

  return useFetch(url, options);
}
