import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function CategoriaLanding({ id, title, picture, description }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <Link to={`/categorias/${id}`} className="block">
        <img
          src={API_URL + picture}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
      </Link>
    </div>
  );
}
