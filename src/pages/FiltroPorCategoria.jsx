import { useParams } from "react-router-dom";
import { useFetchCategoria } from "../utils/FetchCategoria";
import CategoriaCard from "../components/categoriaComponent/CategoriaCard";

function FiltroPorCategoria() {
  const { id } = useParams(); // id de la categoría desde la URL
  const { data: categoria, loading, error } = useFetchCategoria(id);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!categoria || categoria === "")
    return <div>No hay productos en esta categoría</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <CategoriaCard
        key={categoria.id}
        title={categoria.title}
        picture={`http://161.35.104.211:8000${categoria.picture}`}
        description={categoria.description}
      />
    </div>
  );
}

export default FiltroPorCategoria;
