import { useState } from "react";
import { useFetchProductos } from "../utils/useFetchProductos";
import { SearchBar } from "../components/SearchBar";
import TablaProducto from "../components/admin/TablaProducto";
import NavBar from "../components/Navbar";
import Footer from "../components/genericos/Footer";
import { Link } from "react-router-dom";

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

  // Manejo de delete
  const handleDelete = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este producto?")) {
      const res = await fetch(`/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        // Filtra el producto eliminado
        setProductos(productos.filter((p) => p.id !== id));
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="pt-20 px-10 bg-[#1b1d1f] min-h-screen text-white">
        <div className=" flex justify-between  font-bold text-white mb-4">
          <SearchBar value={search} onChange={setSearch} />
          <h1 className="text-2xl">Lista Productos</h1>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
            <Link to="/admin/crearProducto">+ Agregar videojuego</Link>
          </button>
        </div>

        <TablaProducto productos={juegosFiltrado} onDelete={handleDelete} />
      </div>
      <Footer />
    </>
  );
}
