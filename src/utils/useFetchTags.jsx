// hooks/useFetchCategoria.js
import { useFetch } from "./useFetch";

export function useFetchTags(id) {
  const url = `http://161.35.104.211:8000/tags/` + (id ? `${id}/` : "");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer elias",
    },
  };

  return useFetch(url, options);
}
