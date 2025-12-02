import { useState, useEffect } from "react";
import { ModalDeleteTag } from "../ModalDeleteTag";
import { SearchBar } from "../SearchBar";
import { ModalTags } from "../ModalTags";

const API_URL = import.meta.env.VITE_API_URL;

export default function TablaTags({searchCat ,setSearchCat}) {
 

  //fetch de tags
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    try {
      const res = await fetch(`${API_URL}/tags/`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer elias",
        },
      });
      const data = await res.json();
      setTags(data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  };

   useEffect(() => {
    fetchTags();
  }, []);

  //para poder actualizar listado cuando se modifique la lista
   const recargarTags = () => {
    fetchTags();
  };
   //Filtrado por tag usando el valor de la barra de busqueda
  const tagsFiltrado =
    tags?.filter((tagIndividual) =>
      tagIndividual.title.toLowerCase().includes(searchCat.toLowerCase())
    ) || [];

    
  //Mostrar o no modal
  const [showModal, setShowModal] = useState(false);

  //Mostrar modal de borrar
  const [showModalDelete, setShowModalDelete] = useState(false);
  //Tag a borrar
   const [tagABorrar, setTagABorrar] = useState(false);
 

  //Estado para saber si se esta editando o creando para manejar el evento como corresponda
  const [editing, setEditing] = useState(null);

  //Estado del formulario
  const [form, setForm] = useState({
    title: "",

  });

  //Abrir crear tag
  const openModalNew = () => {
    setEditing(null);
    setForm({
      title: "",
    });
    setShowModal(true);
  };

  //Abrir Editar: 
  const openModalEdit = (tag) => {
    setEditing(tag);

    setForm({
      title: tag.title,
    });

    setShowModal(true);
  };
  //Abrir Borrar:
  const openModalDelete = (tag) =>{
      setTagABorrar(tag);
      setShowModalDelete(true);
  }

  //Cerrar modal
  const closeModal = () => {setShowModal(false)};
  //Cerrar modal borrar
  const closeModalDelete = () => {setShowModalDelete(false)}

  //Mantener sincronizado
  const handleChange = (e) => {
  const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  //Submits
  const handleSubmit = async (e) => {
    e.preventDefault();
    //chequeo si esta vacio el titulo
    if (!form.title.trim()) {
      alert("El título es obligatorio");
      return;
    }
    try {
      let categoryId = editing?.id;
      //Editar
      if (editing) {
        await fetch(`${API_URL}/tags/${categoryId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: "Bearer elias",
          },
          body: JSON.stringify({
            title: form.title,
          }),
        });
        recargarTags()
      }

      //Crear
      else {
        const res = await fetch(`${API_URL}/tags/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: "Bearer elias",
          },
          body: JSON.stringify({
            title: form.title,
          }),
        });
        recargarTags()
      }

      closeModal();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    }
  };
  //Handle de borrado
  const handleDelete = async (tag) => {
    try {
      await fetch(`${API_URL}/tags/${tag.id}`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: "Bearer elias",
        },
      }); 
      closeModalDelete();
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
    recargarTags()
  };

  return (
    <div className="mt-10">
     <h1 className="md:hidden text-2xl mb-2 font-bold flex justify-center">Lista Tags</h1>
     <div className="flex justify-between">              
           {/* Busqueda en tabla de tags */}

          <button
            className="w-48 hidden md:block px-4 py-2 mb-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow text-base font-bold"
            onClick={openModalNew}
          >
              + Agregar tag
          </button>
          <button
            className="block md:hidden px-4 py-2 mb-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow text-base font-bold"
            onClick={openModalNew}
          >
              +Tag
          </button>
           <h1 className="hidden md:block text-2xl mb-2 font-bold">Lista Tags</h1>
    
                    <SearchBar value={searchCat} onChange={setSearchCat} />
      </div>

    
    <section className="w-full">
      <div className="mx-auto max-w-7xl bg-gray-900">
        {/* Estilo en movil */}
            <div className="flex flex-col gap-3 md:hidden">
                {tagsFiltrado.map((tag) => (
                    <div
                    key={tag.id}
                    className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex justify-between items-center"
                    >
                    {/* Título */}
                    <p className="text-white font-semibold text-base flex-1">
                        {tag.title}
                    </p>

                    {/* Botones a la derecha */}
                    <div className="flex flex-col sm:flex-row gap-2 ml-4">
                        <button
                        className="w-24 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded"
                        onClick={() => openModalEdit(tag)}
                        >
                        Editar
                        </button>

                        <button
                        className="w-24 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                        onClick={() => openModalDelete(tag)}
                        >
                        Eliminar
                        </button>
                    </div>
                    </div>
                ))}
            </div>
        {/* Tabla de tags */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-gray-900 text-gray-200">
            <thead className="border border-gray-700 bg-gray-800 text-white">
              <tr className="grid grid-cols-[1fr_140px]">
                <th className="px-4 py-2 text-left">Título</th>
                <th className="px-4 py-2 text-center mr-20">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {tagsFiltrado.map((tag) => (
                    <tr
                    key={tag.id}
                   className="grid grid-cols-[1fr_140px] items-center"
                    >

                    <td className="px-4 py-3">{tag.title}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2 sm:flex-row flex-col sm:space-y-0 space-y-2">
                          <button className="w-24 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded">
                            Editar
                          </button>
                          <button className="w-24 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded">
                            Eliminar
                          </button>
                      </div>
                    </td>

                    </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        {/* Modal */}
        {showModal && ( 
          <ModalTags form={form} handleChange={handleChange} handleSubmit={handleSubmit} closeModal={closeModal} editing={editing}/>
        )}
         {/* Modal de borrar*/}
        {showModalDelete && (
          <ModalDeleteTag
            closeModalDelete={closeModalDelete}
            tagABorrar={tagABorrar}
            handleDelete ={handleDelete }
          />
        )}
    </section>
    </div>
  );
}