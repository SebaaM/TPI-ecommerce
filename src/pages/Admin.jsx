import { useState } from "react";
import { useFetchProductos } from "../utils/useFetchProductos";
import { SearchBar } from "../components/SearchBar";
import TablaProducto from "../components/admin/TablaProducto";

export default function AdminProductos() {
  const [search, setSearch] = useState("");
  const { data: productos, loading, error } = useFetchProductos();

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

  const juegosFiltrado =
    productos?.filter((juego) =>
      juego.title.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <SearchBar value={search} onChange={setSearch} />
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
          onClick={() => alert("Agregar videojuego")}
        >
          + Agregar videojuego
        </button>
      </div>

      <TablaProducto productos={juegosFiltrado} />
    </div>
  );
}
