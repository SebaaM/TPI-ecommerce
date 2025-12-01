import { useParams } from "react-router-dom";
import { useFetchProductos } from "../../utils/useFetchProductos";
import Ficha from "../Ficha";
import Navbar from "../Navbar";
import Footer from "../genericos/Footer";
import Loader from "../genericos/Loader";
function CategoriaFilter() {
  const id = useParams().id;
  const { data: productos, loading, error } = useFetchProductos();

  
  //Filtrado por categoria
  const productosFiltrados = productos
    .filter((p) => String(p.category_id) === String(id))


  return (
    <>
    <div className="pt-24 md:pt-12 px-4 bg-gray-800 min-h-screen w-full">
      <Navbar />

      {/* Si hay un error */}
      { error && (<div>Error: {error}</div>)
      }
       {/* Cargando */}
        {loading && (
          <div className="animate-pulse">
               <Loader/>
          </div>
        )}
        {/* No esta cargando pero no hay productos*/}
        {!loading && (productosFiltrados.length === 0) && (
          <div className="w-full flex justify-center items-center text-gray-400 py-10 text-lg">
            No hay productos en esta categoría
          </div>
        )}

         <div className="mt-8 -mx-20px grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full justify-items-center">

            {/* No esta cargando y hay productos */}
            {!loading && productos && productos.length > 0 && (
                  productosFiltrados.map((producto, i) => (
                    <Ficha
                      key={i}
                      id={producto.id}
                      pictures={`http://161.35.104.211:8000${producto.pictures[0]}`}
                      titletitle={producto.title}
                      description={producto.description}
                      price={producto.price}
                    />
                  ))
             )}
          </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoriaFilter;
