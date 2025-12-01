export const ModalCategorias = ({form, handleChange, handleSubmit, closeModal, editing }) => {
  
  return (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-gray-800 rounded-lg p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-white mb-4">
              {editing ? "Editar Categoría" : "Crear Categoría"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-white text-sm">Título</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm"
                />
              </div>

              <div>
                <label className="block mb-1 text-white text-sm">Descripción</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm"
                />
              </div>

              <div>
                 
                <label className="block mb-1 text-white text-sm">Imagen Actual</label>
                <div className="px-4 py-3">
                    {(form.picturePreview || form.picture) && (
                    <img
                        src={form.picturePreview
                              ? form.picturePreview
                              : `http://161.35.104.211:8000${form.picture}`
                          }
                        className="w-14 h-14 object-cover rounded"
                        alt={form.title}
                    />
                      )}
                </div>
                <input
                  type="file"
                  name="picture"
                  onChange={handleChange}
                  className="w-full text-white text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-600 text-white rounded text-sm"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
  )
}
