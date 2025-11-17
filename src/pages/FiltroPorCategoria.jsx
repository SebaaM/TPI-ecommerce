import { useParams } from "react-router-dom";
import { useFetchCategoria } from "../utils/FetchCategoria";
import CategoriaCard from "../components/categoriaComponent/CategoriaCard";

function FiltroPorCategoria() {
  const { data: categorias, loading, error } = useFetchCategoria();

  if (loading) return <div>Cargando categorias...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!categorias || categorias === "")
    return <div>No hay productos en esta categoría</div>;

  return (
    <div className="p-4 bg-gray-900 min-h-screen w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categorias.length > 0 ? (
          //condicion verdadera
          categorias.map((cat) => (
            <CategoriaCard
              key={cat.id}
              title={cat.title}
              picture={`http://161.35.104.211:8000${cat.picture}`}
              description={cat.description}
            />
          ))
        ) : (
          // condicion falsa
          <p className="text-white p-4">No hay categorias</p>
        )}
      </div>
    </div>
  );
}

export default FiltroPorCategoria;
