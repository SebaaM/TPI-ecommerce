// hooks/useFetchCategoria.js
import { useFetch } from "./useFetch";

const API_URL = import.meta.env.VITE_API_URL;

export function useFetchCategoria(id) {
  const url = `${API_URL}/categories/` + (id ? `${id}/` : "");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer elias",
    },
  };

  return useFetch(url, options);
}
