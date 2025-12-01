import { useState } from "react";
import { ProductList } from "./ProductList";
import Navbar from "./Navbar";
import { SearchBar } from "./SearchBar";
import ResultadosBusqueda from "../components/ResultadosBusqueda";
import { useFetchProductos } from "../utils/useFetchProductos";
export const Catalogo = ({ apiUrl, apiToken }) => {

 
  // Para busqueda de productos en el listado de productos 
  const [searchInput, setSearchInput] = useState("");

  // dejar un filtro por defecto en "todas las categorias", se estan duplicando datos.
  return (
    <div className="pt-16 pl-4 pr-4 md:pt-4 pb-0 bg-gray-800 flex flex-col w-full min-h-screen overflow-x-hidden items-center my-8">
      <Navbar />
      
      {/* Para busqueda de productos en el listado de productos */}
      <div className="pt-10">
           <SearchBar value={searchInput} onChange={setSearchInput}/>
      </div>

      <ProductList
        apiUrl={apiUrl}
        apiToken={apiToken}
        searchInput={searchInput}
      />
    </div>
  );
};
