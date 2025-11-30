import { useState } from "react";
import FilaCategorias from "./FilaCategorias";
import { ModalCategorias } from "../ModalCategorias";
export default function TablaCategorias({ categorias }) {
 

  //Mostrar o no modal
  const [showModal, setShowModal] = useState(false);

  //Estado para saber si se esta editando o creando para manejar el evento como corresponda
  const [editing, setEditing] = useState(null);

  //Estado del formulario
  const [form, setForm] = useState({
    title: "",
    description: "",
    picture:  null,
  });

  //Abrir crear categoria
  const openModalNew = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      picture:  null,
    });
    setShowModal(true);
  };

  //Abrir Editar: 
  const openModalEdit = (categoria) => {
    setEditing(categoria);

    setForm({
      title: categoria.title,
      description: categoria.description,
      picture: categoria.picture,
    });

    setShowModal(true);
  };

  //Cerrar modal
  const closeModal = () => {setShowModal(false)};

  //Mantener sincronizado
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  //Submits
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form enviado:", form);
    closeModal();
  };

  return (
    <>
    <button
            className="px-4 py-2 mb-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow"
            onClick={openModalNew}
          >
        + Agregar categoría
    </button>
    <section className="w-full bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Estilo en movil */}
        <div className="flex flex-col gap-3 md:hidden">
          {categorias.map((categoria) => (
            <div
              key={categoria.id}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex gap-4 items-start"
            >
              <img
                src={`http://161.35.104.211:8000${categoria.picture}`}
                className="w-16 h-16 object-cover rounded-md"
                alt={categoria.title}
              />

              <div>
                <p className="text-white font-semibold text-base">
                  {categoria.title}
                </p>

                <p className="text-gray-300 line-clamp-3 max-w-[200px] mt-1">
                  {categoria.description}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded "
                    onClick={() => openModalEdit(categoria)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                    onClick={() => alert(`Eliminar ${categoria.title}`)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla de categorias */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-gray-200">
            <thead className="border border-gray-700 bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Imagen</th>
                <th className="px-4 py-2 text-left">Título</th>
                <th className="px-4 py-2 text-left">Descripción</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {categorias.map((categoria) => (
                <FilaCategorias key={categoria.id} categoria={categoria} openModalEdit={openModalEdit }/>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        {/* Modal */}
        {showModal && ( 
          <ModalCategorias form={form} handleChange={handleChange} handleSubmit={handleSubmit} closeModal={closeModal} editing={editing}/>
        )}
    </section>
    </>
  );
}