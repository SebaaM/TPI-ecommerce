export function ModalDeleteTag({ closeModalDelete, tagABorrar, handleDelete  }) {
  if (!tagABorrar) return null;
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
            Eliminar Tag
            </h2>

            <p className="text-white font-bold mb-6">
            ¿Eliminar el Tag{" "}
            <span className="font-bold  text-red-600">
                "{tagABorrar.title}"
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
                onClick={() => handleDelete(tagABorrar)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
            >
                Eliminar
            </button>
            </div>
        </div>
        </div>
  );
}
