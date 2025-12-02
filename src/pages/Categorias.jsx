import { useFetchCategoria } from "../utils/useFetchCategoria";
import CategoriaCard from "../components/categoriaComponent/CategoriaCard";
import Navbar from "../components/Navbar";
import Footer from "../components/genericos/Footer";
import Loader from "../components/genericos/Loader";

const API_URL = import.meta.env.VITE_API_URL;

function Categorias() {
  const { data: categorias, loading, error } = useFetchCategoria();

  return (
    <>
    <div className="pt-24 md:pt-12 px-4 pb-4 bg-gray-800 min-h-screen w-full">
      <Navbar />
      {/* Si hay un error */}
      { error && (<div>Error: {error}</div>)
      }
      {/* Cargando */}
      {loading && (
           <div  className="min-h-screen">
              <Loader/>
           </div>
         
        )}

      {/* No esta cargando pero no hay categorias*/}
      {!loading && (!categorias || categorias === "") && (
      <div className="text-white py-10"> No hay categorías disponibles.</div>
      )}
      <div className="mt-8 -mx-20px grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full justify-items-center">
       {/* No esta cargando, no fue error, tengo categorias y tiene tamaño mayor a 0 */}
        {!loading && !error && categorias && categorias.length > 0 && (
          categorias.map((cat) => (
            <CategoriaCard
              key={cat.id}
              id={cat.id}
              title={cat.title}
              picture={`${API_URL}${cat.picture}`}
              description={cat.description}
            />
          ))
        )}
        
          {/* no fue error, no esta cargando, categorias no es null pero al buscar tiene tamaño 0*/}
          {!loading && !error && categorias && categorias.length == 0 && (
                <p className="text-white p-4">No hay categorias o no existen con el nombre buscado</p>
          )}
        
      </div>
    </div>
      <div className="w-full z-30 relative mt-8">
          <Footer />
      </div>
    </>
  );
}

export default Categorias;
