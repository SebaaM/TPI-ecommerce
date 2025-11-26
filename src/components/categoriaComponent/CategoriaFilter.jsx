import { useParams } from "react-router-dom";
import { useFetchCategoria } from "../../utils/useFetchCategoria";
import { useFetchProductos } from "../../utils/useFetchProductos";
import Ficha from "../Ficha";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../genericos/Footer";
import ResultadosBusqueda from "../ResultadosBusqueda";
function CategoriaFilter() {
  const id = useParams().id;
  const { data: productos, loading, error } = useFetchProductos();

  const [searchInput, setSearchInput] = useState("");
  //movido hacia abajo de nav bar para que puedan renderizar aunque este en "loading"
  //if (loading) return <div>Cargando productos...</div>;
  //if (error) return <div>Error: {error}</div>;


  
  //Filtrado por categoria
  const productosFiltrados = productos
    .filter((p) => String(p.category_id) === String(id))



    // filtrado de productos para sugerencias
    const searchResults = searchInput.length
      ? productos.filter(p => 
          p.title.toLowerCase().includes(searchInput.toLowerCase())
        )
      : [];


  return (
    <>
    <div className="pt-24 md:pt-12 px-4 bg-gray-800 min-h-screen w-full">
      <Navbar value={searchInput} onChange={setSearchInput}/>
      {searchInput && (
            <ResultadosBusqueda 
                searchResults={searchResults}
            />
            )}
      {/* Si hay un error */}
      { error && (<div>Error: {error}</div>)
      }
       {/* Cargando */}
        {loading && (
          <div className="text-white py-10">Cargando categorías...</div>
        )}
        {/* No esta cargando pero no hay productos*/}
          {!loading && (!productos || productos.length === 0) && (
          <div className="text-white py-10"> No hay productos en esta categoría</div>
        )}
      {/* No esta cargando y hay productos */ }
       {!loading && productos && productos.length > 0 && (
      <div className="mt-8 -mx-20px grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full justify-items-center">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto, i) => (
            <Ficha
              key={i}
              id={producto.id}
              pictures={`http://161.35.104.211:8000${producto.pictures}`}
              titletitle={producto.title}
              description={producto.description}
              price={producto.price}
            />
          ))
        ) : (
          <div className="col-span-full text-gray-400 py-10">
            No hay productos con ese nombre.
          </div>
        )}
      </div>
       )}
    </div>
    <Footer />
    </>
  );
}

export default CategoriaFilter;
