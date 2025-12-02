
const API_URL = import.meta.env.VITE_API_URL;

export default function FilaCategorias({ categoria, openModalEdit, openModalDelete}) {
  return (
          <tr
                  key={categoria.id}
                  className="border border-gray-700 text-sm"
                >
                  <td className="px-4 py-3">
                    <img
                      src={`${API_URL}${categoria.picture}`}
                      className="w-14 h-14 object-cover rounded"
                      alt={categoria.title}
                    />
                  </td>

                  <td className="px-4 py-3 text-base">{categoria.title}</td>

                  <td className="px-4 py-3 max-w-[400px] text-gray-300">
                    {categoria.description}
                  </td>

                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded mr-2"
                      onClick={() => openModalEdit(categoria)}
                    >
                      Editar
                    </button>

                    <button
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                      onClick={() => openModalDelete(categoria)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
  );
}
