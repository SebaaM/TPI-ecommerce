import { useState, useEffect } from "react";
import { useFetchProductos } from "../utils/useFetchProductos";
import { SearchBar } from "../components/SearchBar";
import TablaProducto from "../components/admin/TablaProducto";
import NavBar from "../components/Navbar";
import Footer from "../components/genericos/Footer";
import TablaCategorias from "../components/admin/TablaCategorias";import { Link } from "react-router-dom";
import LoaderAzul from "../components/genericos/LoaderAzul";

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminProductos() {
   //estado de barra de busqueda de categorias en la tabla
   const [searchCat, setSearchCat] = useState("");

  //estado de barra de busqueda de productos en la tabla
  const [search, setSearch] = useState("");

  
  //fetch de productos
  const { data: productos, loading, error } = useFetchProductos();
  const [productosState, setProductosState] = useState([]);

  useEffect(() => {
    if (productos) {
      setProductosState(productos);
    }
  }, [productos]);

 
  //estado para renderizado condicional de cual crud se desea usar (entre productos y categorias)
  const [abmProductos, setAbm] = useState(true);

  //mostrar productos y reiniciar input de busqueda
  function mostrarProductos(){
    setSearch("")
    setAbm(true) 
  }
  //mostrar categorias y reiniciar input de busqueda
  function mostrarCategorias(){
    setSearchCat("")
    setAbm(false)
  }

  if (!productos) {
    return <p className="text-white p-4">No se encontraron productos</p>;
  }

  let juegosFiltrado =
    productosState?.filter((juego) =>
      juego.title.toLowerCase().includes(search.toLowerCase())
    ) || [];

  // Manejo de delete
  const handleDelete = async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer elias",
      },
    });
    if (res.ok) {
      setProductosState((prev) => prev.filter((juego) => juego.id !== id));
    } else {
      console.error("Error al eliminar el producto");
    }
  };

  return (
    <>
      <div className="min-h-screen">
      <NavBar />
       {/* Si hay un error */}
      { error && (<div>Error: {error}</div>)
      }
      {/* Cargando */}
      {loading && (
         <div  className="min-h-screen">
            <LoaderAzul/>
        </div>
          
        )}

      {!loading && (

      <div className="pt-20 px-10 bg-[#1b1d1f] min-h-screen text-white">
        <div className="mt-12 md:mt-1 flex justify-between  font-bold text-white mb-4">
           <button
            className="mr-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
            onClick={() => mostrarProductos()}
          >
            Administrar productos
          </button>
          
          <button
            className="ml-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
            onClick={() => mostrarCategorias()}
          >
            Administrar categorias
          </button>

        </div>
        {/* Listado de productos */}
         {abmProductos && (
          <>
              <div className=" flex justify-between  font-bold text-white mb-4">
                 {/* Busqueda en tabla de productos */}
                 <SearchBar value={search} onChange={setSearch} />
                 <h1 className="text-2xl">Lista Productos</h1>
                 <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
                  <Link to="/admin/crearProducto">+ Agregar videojuego</Link>
                 </button>
              </div>
              <TablaProducto productos={juegosFiltrado} onDelete={handleDelete} />
          </>
          )}

          {/* Listado de categorias */}
          {!abmProductos && (    
                  <TablaCategorias searchCat={searchCat} setSearchCat={setSearchCat}/>
          )}
      </div>
      )}
      </div>
      <Footer />
    </>
  );
}