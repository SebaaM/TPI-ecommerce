// Fetch par obtener datos de un producto en especifico
import { useFetch } from "./useFetch";

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

export function useFetchProduct(id) {
  const url = `${API_URL}/products/` + (id ? `${id}/` : "");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  return useFetch(url, options);
}
