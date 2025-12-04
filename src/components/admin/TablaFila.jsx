import { Link } from "react-router-dom";

export default function TablaFila({ juego, openModalDelete }) {



  return (
    <>
    <tr className="border-t border-gray-700">
      <td className="text-sm md:text-base px-4 py-2">{juego.title}</td>
      <td className="px-2 py-2">${juego.price}</td>
      <td className=" px-4 py-2 md:table-cell hidden">
        {juego.category?.title}
      </td>
      <td className="px-2 py-2 md:px-4 md:py-2">
        {juego.tags?.map((tag) => (
          <span
            key={tag.id || tag.title}
            className="inline-block bg-gray-700 text-xs px-2 py-1 rounded mr-1"
          >
            {tag.title}
          </span>
        ))}
      </td>
      <td className="px-4 py-2 text-center">
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-y-0 space-y-2">
          <button className="sm:w-18 md:w-24 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded mr-2">
            <Link to={`/admin/editarProducto/${juego.id}`}>Editar</Link>
          </button>
          <button
            className="w-18 md:w-24 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
            onClick={() => openModalDelete(juego)}
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
    </>
    
  );
}
