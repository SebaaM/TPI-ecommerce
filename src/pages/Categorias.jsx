import { useParams } from "react-router-dom";
import { useFetchCategoria } from "../utils/useFetchCategoria";
import CategoriaCard from "../components/categoriaComponent/CategoriaCard";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/genericos/Footer";

function Categorias() {
  const { data: categorias, loading, error } = useFetchCategoria();
  // const [productos, setProducts] = useState([]);

  if (loading) return <div>Cargando categorias...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!categorias || categorias === "")
    return <div>No hay productos en esta categoría</div>;

  return (
    <div className="bg-gray-900 min-h-screen w-full">
      <Navbar />
      <div className="p-10 m-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {categorias.length > 0 ? (
          //condicion verdadera
          categorias.map((cat) => (
            <CategoriaCard
              key={cat.id}
              id={cat.id}
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
      <Footer />
    </div>
  );
}

export default Categorias;
