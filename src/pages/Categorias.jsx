import { useParams } from "react-router-dom";
import { useFetchCategoria } from "../utils/useFetchCategoria";
import CategoriaCard from "../components/categoriaComponent/CategoriaCard";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/genericos/Footer";

function Categorias() {
  const { data: categorias, loading, error } = useFetchCategoria();
  //para usar la barra de busqueda con categorias
  const [searchInput, setSearchInput] = useState("");
  //filtrar segun lo que se escribe
  const categoriaBuscada = categorias
    .filter((c) => c.title.toLowerCase().includes(searchInput.toLowerCase()));


  //movido hacia abajo de nav bar para que puedan renderizar aunque este en "loading"
  //if (loading) return <div>Cargando categorias...</div>;
  //if (error) return <div>Error: {error}</div>;

  return (
    <>
    <div className="pt-24 md:pt-12 px-4 pb-4 bg-gray-800 min-h-screen w-full">
      <Navbar value={searchInput} onChange={setSearchInput}/>
      {/* Si hay un error */}
      { error && (<div>Error: {error}</div>)
      }
      {/* Cargando */}
      {loading && (
          <div>Cargando categorías...</div>
        )}

      {/* No esta cargando pero no hay categorias*/}
      {!loading && (!categorias || categorias === "") && (
      <div className="text-white py-10"> No hay productos en esta categoría</div>
      )}
      <div className="mt-8 -mx-20px grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full justify-items-center">
       {/* No esta cargando, no fue error, tengo categorias y tiene tamaño mayor a 0 */}
        {!loading && !error && categorias && categorias.length > 0 && (
          categoriaBuscada.map((cat) => (
            <CategoriaCard
              key={cat.id}
              id={cat.id}
              title={cat.title}
              picture={`http://161.35.104.211:8000${cat.picture}`}
              description={cat.description}
            />
          ))
        )}
        
          {/* no fue error, no esta cargando, categorias no es null pero al buscar tiene tamaño 0*/}
          {!loading && !error && categorias && categoriaBuscada.length == 0 && (
                <p className="text-white p-4">No hay categorias o no existen con el nombre buscado</p>
          )}
        
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Categorias;
