import { Link } from "react-router-dom";

export default function CategoriaCard({ id, picture, title, description }) {
  // agregar el onclick para redirigir a la pagina de la categoria
  return (
    <Link
      to={`/categories/${id}`}
      className="relative group block rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 aspect-4/5 w-full max-w-60"
    >
      {/* Imagen */}

      <img
        src={picture}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-md"
      />

      {/* Overlay hover */}
      <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-300 max-w-[80%]">{description}</p>
      </div>

      {/* nombre y descripcion */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 flex items-center justify-between  px-3 py-2">
        <span className="mx-auto text-lg font-bold text-green-400 align">
          {title}
        </span>
      </div>
    </Link>
  );
}
