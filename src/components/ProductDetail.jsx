import { useFetchProduct } from "../utils/useFetchProduct";
import { useParams } from "react-router-dom";
import BotonLargo from "./BotonLargo";
import { useContext } from "react";
import { CartContext } from "../context/cart";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  //id del producto obtenido de a url
  const id = useParams().id;
  const { data: producto, loading, error } = useFetchProduct(id);
  //Para funcionalidad del boton
  const { addToCart, addMultiple } = useContext(CartContext);
  //Contador de cantidad de productos a agregar
  //1 es la cantidad minima a comprar
  const [counter, setCounter] = useState(1);

  //Producto con url correcta
  const productoURLImagen = {
    ...producto,
    //correccion de url
    pictures: `http://161.35.104.211:8000${producto.pictures}`,
  };

  if (loading)
    return (
      <div className="h-[600px] w-full bg-gray-800 animate-pulse rounded-xl">
        Cargando...
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!producto || producto === "")
    return <div>No hay productos en esta categoría</div>;

  return (
    <div className="p-8 mt-24 md:mt-16 mb-6 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 justify-items-center">
          {/* Imagen */}
          <div className="md:w-1/2">
            <div
              className="max-w-[230px] 
                            sm:aspect-3/4 sm:max-w-[300px] 
                            md:aspect-4/5 w-full md:max-w-90
                            rounded-lg bg-gray-700 overflow-hidden  mx-auto"
            >
              <img
                className="w-full h-full object-cover"
                src={"http://161.35.104.211:8000" + producto.pictures[0]}
                alt={productoURLImagen.title}
              />
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text- text-3xl font-bold mb-2">
                {productoURLImagen.title}
              </h2>
              {/* Precio */}
              <p className="text-xl sm:text-2xl md:text-4xl font-bold text-green-400 mb-4">
                ${productoURLImagen.price.toFixed(2)}
              </p>
              {/* Categorías del producto */}
              <div className="mb-6">
                <span className="font-semibold text-gray-300">Tags</span>
                <div className="flex gap-2 mt-2">
                  {productoURLImagen.tags.map((tag, i) => (
                    <button
                      key={i}
                      className="bg-gray-700 py-2 px-4 rounded-full hover:bg-gray-600"
                    >
                      {tag.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Descripción */}
              <p className="text-gray-300 md:text-lg leading-relaxed">
                {productoURLImagen.description}
              </p>
            </div>

            {/* Botones */}
            <div className="mt-8 flex gap-4">
              <BotonLargo
                textoBoton={"Añadir al carrito"}
                funcionClick={() => addMultiple(productoURLImagen, counter)}
              />
              <div className="flex items-center bg-green-700 text-white hover:bg-green-900 transition rounded-lg font-bold">
                {/*Boton menos*/}
                <button
                  className="cursor-pointer px-3 py-2 md:px-3 md:py-3"
                  onClick={() => setCounter(counter - 1)}
                  disabled={counter === 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-2.5 fill-current"
                    viewBox="0 0 124 124"
                  >
                    <path
                      d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>
                {/*Cantidad de productos*/}
                <span className="mx-3 px-3 py-2 md:px-3 md:py-3">
                  {counter}
                </span>
                {/*Boton mas*/}
                <span
                  className="cursor-pointer px-3 py-2 md:px-3 md:py-3"
                  onClick={() => setCounter(counter + 1)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-2.5 fill-current"
                    viewBox="0 0 42 42"
                  >
                    <path
                      d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
