import { useState } from "react";
import TablaFila from "./TablaFila";
import { useFetch } from "../../utils/useFetch";

export default function TablaProducto({ onDelete }) {
  const [page, setPage] = useState(0);
  const limit = 10;

  const skip = page * limit;

  const url = `http://161.35.104.211:8000/products/?skip=${skip}&limit=${limit}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer elias",
    },
    method: "GET",
  };

  const { data: productos, loading, error } = useFetch(url, options);

  return (
    <div className="overflow-x-auto mt-2 py-4 ">
      {loading && <p className="text-gray-400">Cargando productos...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <>
          <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden ">
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
              {productos.map((juego) => (
                <TablaFila key={juego.id} juego={juego} onDelete={onDelete} />
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
              disabled={productos.length < limit} // Deshabilitar si no hay más productos
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}
