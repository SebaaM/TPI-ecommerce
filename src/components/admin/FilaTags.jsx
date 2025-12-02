
const API_URL = import.meta.env.VITE_API_URL;

export default function FilaTags({ tag, openModalEdit, openModalDelete}) {
  return (
          <tr
                  key={tag.id}
                  className="border border-gray-700 text-sm"
                >

                  <td className="px-4 py-3 text-base">{tag.title}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded mr-2"
                      onClick={() => openModalEdit(tag)}
                    >
                      Editar
                    </button>

                    <button
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                      onClick={() => openModalDelete(tag)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
  );
}
