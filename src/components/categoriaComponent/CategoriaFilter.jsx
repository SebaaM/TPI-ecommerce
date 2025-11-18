import { useParams } from "react-router-dom";
import { useFetchCategoria } from "../../utils/useFetchCategoria";
import { useFetchProductos } from "../../utils/useFetchProductos";
import Ficha from "../Ficha";
import { useEffect, useState } from "react";

function CategoriaFilter() {
  const id = useParams().id;
  const { data: productos, loading, error } = useFetchProductos();

  const [searchInput, setSearchInput] = useState("");

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productos || productos === "")
    return <div>No hay productos en esta categoría</div>;

  const productosFiltrados = productos
    .filter((p) => String(p.category_id) === String(id))
    .filter((p) => p.title.toLowerCase().includes(searchInput.toLowerCase()));

  return (
    <div className="p-4 bg-gray-900 min-h-screen w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto, i) => (
            <Ficha
              key={i}
              id={producto.id}
              urlImagen={`http://161.35.104.211:8000${producto.pictures}`}
              titulo={producto.title}
              description={producto.description}
              price={producto.price}
            />
          ))
        ) : (
          <div className="col-span-full text-gray-400 py-10">
            No hay productos con ese nombre.
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriaFilter;
