// hooks/useFetchCategoria.js
import { useFetch } from "./useFetch";

export function useFetchCategoria() {
  const url = `http://161.35.104.211:8000/categories/`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer elias",
    },
  };

  return useFetch(url, options);
}
