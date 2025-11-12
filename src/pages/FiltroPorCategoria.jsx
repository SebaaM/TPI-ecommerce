import { useParams } from "react-router-dom";
import { useFetchCategoria } from "../hooks/useFetchCategoria";
import Ficha from "../components/Ficha";

function FiltroPorCategoria() {
  const { id } = useParams(); // id de la categoría desde la URL
  const { data: productos, loading, error } = useFetchCategoria(id);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productos || productos.length === 0)
    return <div>No hay productos en esta categoría</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {productos.map((p) => (
        <Ficha
          key={p.id}
          titulo={p.title}
          imagen={`http://161.35.104.211:8000${p.pictures[0]}`}
          descripcion={p.description}
          precio={p.price}
        />
      ))}
    </div>
  );
}

export default FiltroPorCategoria;
