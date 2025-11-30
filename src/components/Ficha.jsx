import { Link } from "react-router-dom";
import Boton from "./Boton";
import BotonMovil from "./BotonMovil";
import { CartContext } from "../context/cart";
import { useContext } from "react";

export default function Ficha({ id, pictures, title, description, price }) {
  const { cartItems, addToCart } = useContext(CartContext);

  const product = {
    id,
    title,
    description,
    price,
    pictures: pictures[0],
  };
  /*Link engloba a toda la tarjeta, para que en el caso de hacer click, se navegue al producto
       si se hace click en el boton, se agrega al carrito y no redirige
       */
  return (
    <Link
      to={`/producto/${id}`}
      className="relative group block 
                 rounded-lg overflow-hidden 
                 shadow-lg hover:shadow-2xl 
                 transition-all duration-300 
                 aspect-4/5 w-full max-w-60"
    >
      {/* Imagen */}
      <img
        src={pictures}
        alt={title}
        className="absolute inset-0 w-full h-full 
                   object-cover transition-transform 
                   duration-500 group-hover:scale-105 rounded-t-md"
      />

      {/* Overlay hover */}
      <div
        className="absolute inset-0 bg-black/70 flex flex-col justify-center
                     items-center text-center opacity-0 group-hover:opacity-100 
                     transition-opacity duration-300"
      >
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300 max-w-[80%]">{description}</p>
      </div>

      {/* Precio y botón */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-black/70 flex 
                      items-center justify-between px-3 py-2"
      >
        <span className="text-lg font-bold text-green-400">${price}</span>
        <div className="hidden md:block">
          <Boton textoBoton="Añadir" funcionClick={() => addToCart(product)} />
        </div>
        <div className="block md:hidden">
          <BotonMovil funcionClick={() => addToCart(product)} />
        </div>
      </div>
    </Link>
  );
}
