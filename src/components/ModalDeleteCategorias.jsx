export function ModalDeleteCategorias({ closeModalDelete, categoriaABorrar, handleDelete  }) {
  if (!categoriaABorrar) return null;
  return (
        <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
        onClick={closeModalDelete}
        >
        <div
            className="bg-gray-800 rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className="text-lg font-semibold text-white mb-4">
            Eliminar categoría
            </h2>

            <p className="text-white font-bold mb-6">
            ¿Eliminar la categoría{" "}
            <span className="font-bold  text-red-600">
                "{categoriaABorrar.title}"
            </span>
            ?
            </p>

            <div className="flex justify-end gap-3">
            <button
                onClick={closeModalDelete}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm"
            >
                Cancelar
            </button>

            <button
                onClick={() => handleDelete(categoriaABorrar)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
            >
                Eliminar
            </button>
            </div>
        </div>
        </div>
  );
}
