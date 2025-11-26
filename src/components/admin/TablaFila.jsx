export default function TablaFila({ juego }) {
  return (
    <tr className="border-t border-gray-700">
      <td className="px-4 py-2">{juego.title}</td>
      <td className="px-4 py-2">${juego.price}</td>
      <td className="px-4 py-2">{juego.category?.title}</td>
      <td className="px-4 py-2">
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
        <button
          className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded mr-2"
          onClick={() => alert(`Editar ${juego.title}`)}
        >
          Editar
        </button>
        <button
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
          onClick={() => alert(`Eliminar ${juego.title}`)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}
