import { useState, useEffect } from "react";
import { useFetchProductos } from "../utils/useFetchProductos";
import TablaProducto from "../components/admin/TablaProducto";
import NavBar from "../components/Navbar";
import Footer from "../components/genericos/Footer";
import TablaCategorias from "../components/admin/TablaCategorias";
import LoaderAzul from "../components/genericos/LoaderAzul";
import TablaTags from "../components/admin/TablaTags";
import BotonMultiple from "../components/BotonMultiple";

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_BEARER_TOKEN;

export default function AdminProductos() {
  //estado de barra de busqueda de categorias en la tabla
  const [searchCat, setSearchCat] = useState("");

  //estado de barra de busqueda de productos en la tabla
  const [search, setSearch] = useState("");

  //estado de barra de busqueda de tags en la tabla
   const [searchTag, setSearchTag] = useState("");

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
    setSearchTag("");
    setSearch("");
    setSearchCat("");
    setVista("productos");
  }

  //mostrar categorias y reiniciar input de busqueda
  function mostrarCategorias() {
    setSearchTag("");
    setSearch("");
    setSearchCat("");
    setVista("categorias");
  }

  //idem para tags
  function mostrarTags() {
    setSearchTag("");
    setSearch("");
    setSearchCat("");
    setVista("tags");
  }

  if (!productos) {
    return <p className="text-white p-4">No se encontraron productos</p>;
  }

  // Manejo de delete
  const handleDeleteProd = async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
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
                <TablaProducto onDelete={handleDeleteProd} productos={productosState}/>
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
              <TablaTags searchTag={searchTag} setSearchTag={setSearchTag} />
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
