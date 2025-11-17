import { useState } from "react";
import { ProductList } from "./ProductList";
import FiltroPorCategoria from "../pages/Categorias";
import Navbar from "./Navbar";
export const Catalogo = ({ apiUrl, apiToken }) => {
  const [searchInput, setSearchInput] = useState("");

  // dejar un filtro por defecto en "todas las categorias", se estan duplicando datos.
  return (
    <div className="p-4 bg-gray-800 flex flex-col w-full min-h-screen overflow-x-hidden items-center my-8">
      <Navbar value={searchInput} onChange={setSearchInput} />
      <FiltroPorCategoria
        apiUrl={"http://161.35.104.211:8000"}
        apiToken={apiToken}
        searchInput={searchInput}
      />

      <ProductList
        apiUrl={apiUrl}
        apiToken={apiToken}
        searchInput={searchInput}
      />
    </div>
  );
};
