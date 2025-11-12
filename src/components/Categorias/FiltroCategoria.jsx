import { useState, useEffect } from "react";
import Ficha from "../Ficha";
import { useParams } from "react-router-dom";

export const CategoriaList = ({ apiUrl, apiToken, categoria, searchInput }) => {
  const [productos, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProds() {
      // Rutear en routres y utilizar useParams() para dinamizar categorias.
      try {
        const request = await fetch(apiUrl + "/categoria/" + categoria + "/", {
          headers: {
            accept: "application/json",
            Authorization: "Bearer " + apiToken,
          },
        });

        const data = await request.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getProds();
  }, [apiUrl, apiToken]);

  if (loading) return <p className="text-white p-4">Cargando productos...</p>;

  // Filtrado
  const productosFiltrados = productos.filter((p) =>
    p.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div
      id="productosHome"
      className="mt-8 -mx-px grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full justify-items-center"
    >
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
  );
};
