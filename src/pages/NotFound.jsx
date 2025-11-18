import { Link } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1b1d1f] text-white flex flex-col items-center justify-center px-4 py-10">
      <div className="flex flex-col items-center text-center">
        <ExclamationCircleIcon className="h-20 w-20 text-red-500 mb-6" />
        <h1 className="text-4xl font-bold mb-4">404 - Página no encontrada</h1>
        <p className="text-gray-400 text-base max-w-md mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
          Por favor, volvé al inicio para continuar navegando.
        </p>
        <Link
          to="/"
          className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded-md text-sm font-medium transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
