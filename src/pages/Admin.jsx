import { useState, useEffect } from "react";
import { useFetchProductos } from "../utils/useFetchProductos";
import { SearchBar } from "../components/SearchBar";
import TablaProducto from "../components/admin/TablaProducto";
import NavBar from "../components/Navbar";
import Footer from "../components/genericos/Footer";
import TablaCategorias from "../components/admin/TablaCategorias";
import { Link } from "react-router-dom";
import LoaderAzul from "../components/genericos/LoaderAzul";
import TablaTags from "../components/admin/TablaTags";
import BotonMultiple from "../components/BotonMultiple";

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

  //estado para renderizado condicional de cual crud se desea usar (entre productos, categorias y tags)
  const [vista, setVista] = useState("productos");

  //mostrar productos y reiniciar input de busqueda
  function mostrarProductos() {
    setSearch("");
    setVista("productos");
  }

  //mostrar categorias y reiniciar input de busqueda
  function mostrarCategorias() {
    setSearchCat("");
    setVista("categorias");
  }

  //idem para tags
  function mostrarTags() {
    setSearchCat("");
    setVista("tags");
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
        {error && <div>Error: {error}</div>}
        {/* Cargando */}
        {loading && (
          <div className="min-h-screen">
            <LoaderAzul />
          </div>
        )}

        {!loading && (
          <div className="pt-20 px-2 md:px-10 bg-[#1b1d1f] min-h-screen text-white gap-0 sm:gap-3 space-y-3 sm:space-y-0">
            <span className="text-3xl font-bold justify-center flex p-2">
              Panel de administración
            </span>
            <div className="flex flex-col  items-center justify-center mt-14 md:mt-0 sm:items-start  sm:flex-row gap-0 sm:gap-5 space-y-3 sm:space-y-0">
              <BotonMultiple
                onChange={(opcion) => {
                  if (opcion === "productos") mostrarProductos();
                  if (opcion === "tags") mostrarTags();
                  if (opcion === "categorias") mostrarCategorias();
                }}
              />
            </div>
            {/* Listado de productos */}
            {vista === "productos" && (
              <div className="mt-10">
                <h1 className=" md:hidden text-2xl mb-2 font-bold flex justify-center">
                  Lista Productos
                </h1>
                <div className=" flex justify-between text-white">
                  {/* Busqueda en tabla de productos */}

                  <button className=" hidden md:block font-bold px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow">
                    <Link to="/admin/crearProducto">+ Agregar videojuego</Link>
                  </button>
                  <button className=" block md:hidden font-bold px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow">
                    <Link to="/admin/crearProducto">+Videojuego</Link>
                  </button>
                  <h1 className="hidden md:block text-2xl mb-2 font-bold">
                    Lista Productos
                  </h1>
                  <SearchBar value={search} onChange={setSearch} />
                </div>
                <TablaProducto
                  productos={juegosFiltrado}
                  onDelete={handleDelete}
                />
              </div>
            )}
            {/* Listado de categorias */}
            {vista === "categorias" && (
              <TablaCategorias
                searchCat={searchCat}
                setSearchCat={setSearchCat}
              />
            )}
            {/* Listado de tags */}
            {vista === "tags" && (
              <TablaTags searchCat={searchCat} setSearchCat={setSearchCat} />
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
