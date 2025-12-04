import { useState,useEffect } from "react";
import TablaFila from "./TablaFila";
import { SearchBar } from "../SearchBar";
import { Link } from "react-router-dom";
import { ModalDeleteProduct } from "../ModalDeleteProduct";
export default function TablaProducto({  productos, onDelete }) {

  const [productoABorrar, setProductoABorrar] = useState(null);

  //estado de barra de busqueda de categorias en la tabla
  const [searchProd, setSearchProd] = useState("");

  // para actualizar al cambiar el filtro y volver a la primera pagina
  useEffect(() => {
    setPage(0);
  }, [searchProd]);

  const [page, setPage] = useState(0);
  const limit = 10;
  const skip = page * limit;

//Modal
  //Mostrar modal de borrar
const [showModalDelete, setShowModalDelete] = useState(false);
  //Abrir Borrar:
const openModalDelete = (producto) => {
  setProductoABorrar(producto);
  setShowModalDelete(true);
};
//Cerrar modal borrar
  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

const confirm = () => {
  if (productoABorrar) {
    onDelete(productoABorrar.id);
    closeModalDelete();
  }
};
//fin modal


//Filtrado por producto usando el valor de la barra de busqueda
const productosFiltrados =
  productos?.filter((juego) =>
    juego.title.toLowerCase().includes(searchProd.toLowerCase())
  ) || [];


const paginados = productosFiltrados.slice(skip, skip + limit);

if (!productos) {
  return <p className="text-white p-4">No se encontraron productos</p>;
}
//Limite para paginacion segun cantidad de productos
const totalPages = Math.ceil(productosFiltrados.length / limit);

 
  return (
    <>
    <div className="mt-10">
                <h1 className=" md:hidden text-2xl mb-2 font-bold flex justify-center">
                  Lista Productos
                </h1>
                <div className=" flex justify-between text-white">
                  {/* Busqueda en tabla de productos */}

                  <Link to="/admin/crearProducto">
                    <button className=" hidden md:block font-bold px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow">
                    + Agregar videojuego
                    </button>
                  </Link>
                  <Link to="/admin/crearProducto">
                    <button className=" block md:hidden font-bold px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow">
                      +Videojuego
                    </button>
                  </Link>
                  <h1 className="hidden md:block text-2xl mb-2 font-bold">
                    Lista Productos
                  </h1>
                  <SearchBar value={searchProd} onChange={setSearchProd} />
                </div>   
    </div>

    <div className="overflow-x-auto mt-2 py-4 ">
        <div className="md:min-h-[620px] md:flex md:flex-col md:justify-between">
          <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-2 md:px-4 py-2 text-left">Precio</th>
                <th className="px-4 py-2 text-left md:table-cell hidden">
                  Categoría
                </th>
                <th className="px-4 py-2 text-left">Tags</th>
                <th className=" px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 text-gray-200">
              {paginados.map((juego) => (
                <TablaFila key={juego.id} juego={juego}  openModalDelete={openModalDelete} />
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4 pb-4">
            <button
              className="px-4 py-2  text-white rounded disabled:opacity-50 bg-purple-600 hover:bg-purple-700 "
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
            >
              Anterior
            </button>
            <span className="text-gray-300">Página {page + 1}</span>
            <button
              className="px-4 py-2 text-white rounded disabled:opacity-50 bg-purple-600 hover:bg-purple-700"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page + 1 >= totalPages} // Deshabilitar si no hay más productos
            >
              Siguiente
            </button>
          </div>
        </div>
    </div>
    {/* Modal de borrar*/}
    {showModalDelete && (
      <ModalDeleteProduct
        closeModalDelete={closeModalDelete}
        productoABorrar={productoABorrar}
        handleDelete={confirm}
      />
    )}
    </>
  );
}
