import { useState, useEffect } from "react";
import Ficha from "./Ficha";
export const ProductList = ({ apiUrl, apiToken, searchInput,loading, setLoading}) => {
  const [productos, setProducts] = useState([]);

  useEffect(() => {
    async function getProds() {
      try {
        const request = await fetch(apiUrl, {
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

  // Filtrado
  const productosFiltrados = productos.filter((p) =>
    p.title.toLowerCase().includes(searchInput.toLowerCase())

  );

  return (
    <>
        
         {/* No esta cargando pero no hay productos*/}
        {!loading && (!productos || productos.length === 0) && (
        <div className="w-full flex justify-center items-center text-gray-400 py-10 text-lg"> 
            No hay productos disponibles
        </div>
        )}

        <div
          id="productosHome"
          className="mt-8 -mx-px grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full justify-items-center"
        >

      {!loading && productosFiltrados.length > 0 && (
        productosFiltrados.map((producto, i) => (
          
          <Ficha
            key={i}
            id={producto.id}
            pictures={`http://161.35.104.211:8000${producto.pictures[0]}`}
            title={producto.title}
            description={producto.description}
            price={producto.price}
          />
        ))
        
      )} 
      {!loading && productosFiltrados.length === 0 && (
             <div className="col-span-full text-gray-400 py-10 text-lg">
          No hay productos con ese nombre.
        </div>
      )
      }
    </div>
    </>
  );
};
