import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3333",
});

export function getCategories() {
  // бекенд повертає масив за /categories
  return api.get("/categories").then((res) => res.data);
}

export  function getProducts() {
  // бекенд повертає масив за /products/all
  return api.get("/products/all").then((res) => res.data);
}

export default api;