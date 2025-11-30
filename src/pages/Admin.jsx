import { useState } from "react";
import { useFetchProductos } from "../utils/useFetchProductos";
import { SearchBar } from "../components/SearchBar";
import TablaProducto from "../components/admin/TablaProducto";
import NavBar from "../components/Navbar";
import Footer from "../components/genericos/Footer";
import { useFetchCategoria } from "../utils/useFetchCategoria";
import TablaCategorias from "../components/admin/TablaCategorias";
export default function AdminProductos() {

  //estado de barra de busqueda de productos en la tabla
  const [search, setSearch] = useState("");

  //estado de barra de busqueda de categorias en la tabla
   const [searchCat, setSearchCat] = useState("");

  //fetch de productos
  const { data: productos, loading, error } = useFetchProductos();

  //fetch de categorias
  const { data: categorias} = useFetchCategoria();

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

  //Filtrado por categoria usando el valor de la barra de busqueda
  const categoriasFiltrado =
    categorias?.filter((categoria) =>
      categoria.title.toLowerCase().includes(searchCat.toLowerCase())
    ) || [];

  //Filtrado por titulo usando el valor de la barra de busqueda
  const juegosFiltrado =
    productos?.filter((juego) =>
      juego.title.toLowerCase().includes(search.toLowerCase())
    ) || [];

  if (error) {
    return (
      <p className="text-red-500 p-4">
        Error al cargar productos: {error.message}
      </p>
    );
  }

  if (loading) {
    return <p className="text-white p-4">Cargando productos...</p>;
  }

  if (!productos) {
    return <p className="text-white p-4">No se encontraron productos</p>;
  }
 

  return (
    <>
      <NavBar />
      <div className="pt-20 px-10 bg-[#1b1d1f] min-h-screen text-white">
        <div className=" flex justify-between  font-bold text-white mb-4">

           <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
            onClick={() => mostrarProductos()}
          >
            Administrar productos
          </button>
          {/* Busqueda en tabla de productos */}
           {abmProductos && (
               <SearchBar value={search} onChange={setSearch} />
           )}
           {/* Busqueda en tabla de categorias */}
           {!abmProductos && (
               <SearchBar value={searchCat} onChange={setSearchCat} />
           )}

          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
            onClick={() => mostrarCategorias()}
          >
            Administrar categorias
          </button>

     </div>
        {/* Listado de productos */}
         {abmProductos && (
          <>
                <h1 className="text-2xl">Lista Productos</h1>
                <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
                    onClick={() => console.log(categorias)}
                  >
                    + Agregar videojuego
                </button>
                <TablaProducto productos={juegosFiltrado} />
          </>
          )}
        {/* Listado de categorias */}
         {!abmProductos && (
          <>
                <h1 className="text-2xl">Lista Categorias</h1>
                <TablaCategorias categorias={categoriasFiltrado}/>

          </>
         )}
  </div>
      <Footer />
    </>
  );
}
