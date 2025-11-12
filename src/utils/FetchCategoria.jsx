// hooks/useFetchCategoria.js
import { useFetch } from "./useFetch";

export function useFetchCategoria(id) {
  const url = `http://161.35.104.211:8000/categoria/${id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer elias",
    },
  };

  return useFetch(url, options);
}
