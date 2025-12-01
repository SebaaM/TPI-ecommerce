import { useState } from "react";
import { ProductList } from "./ProductList";
import Navbar from "./Navbar";
import { SearchBar } from "./SearchBar";
import Loader from "./genericos/Loader";
import Footer from "./genericos/Footer";
export const Catalogo = ({ apiUrl, apiToken }) => {


  const [loading, setLoading] = useState(true);
  
  // Para busqueda de productos en el listado de productos 
  const [searchInput, setSearchInput] = useState("");

  // dejar un filtro por defecto en "todas las categorias", se estan duplicando datos.
  //el padding es condicional asi cuando carga, no interfiere con el fondo animado
  return ( 
    <>
    <div  className={`bg-gray-800 flex flex-col 
                        w-full min-h-screen overflow-x-hidden 
                        items-center my-8 pt-16 md:pt-4 pb-0
                        ${loading ? "" : "pl-4 pr-4"}
                    `}>
      <Navbar />
        {/* Cargando */}
        {(loading)&& (
            <div className="">
                <Loader/>
            </div>
        )}
      {/* Para busqueda de productos en el listado de productos */}
      {!loading &&(
          <div className="pt-10">
          <SearchBar value={searchInput} onChange={setSearchInput}/>
      </div>

        )}
    
      <ProductList
        apiUrl={apiUrl}
        apiToken={apiToken}
        searchInput={searchInput}
        loading={loading}
        setLoading={setLoading}
      />
      
    </div>
     <div className="w-full z-30 relative mt-8">
        <Footer />
      </div>
    </>

  );
};
