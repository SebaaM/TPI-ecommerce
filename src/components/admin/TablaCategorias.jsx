import { useState, useEffect } from "react";
import FilaCategorias from "./FilaCategorias";
import { ModalCategorias } from "../ModalCategorias";
import { ModalDeleteCategorias } from "../ModalDeleteCategorias";
import { SearchBar } from "../SearchBar";

const API_URL = import.meta.env.VITE_API_URL;

export default function TablaCategorias({searchCat ,setSearchCat}) {
 

  //fetch de categorias
  const [categorias, setCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      const res = await fetch(`${API_URL}/categories/`, {
        headers: {
          accept: "application/json",
          Authorization: "Bearer elias",
        },
      });
      const data = await res.json();
      setCategorias(data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  };

   useEffect(() => {
    fetchCategorias();
  }, []);

  //para poder actualizar listado cuando se modifique la lista
   const recargarCategorias = () => {
    fetchCategorias();
  };
   //Filtrado por categoria usando el valor de la barra de busqueda
  const categoriasFiltrado =
    categorias?.filter((categoria) =>
      categoria.title.toLowerCase().includes(searchCat.toLowerCase())
    ) || [];

    
  //Mostrar o no modal
  const [showModal, setShowModal] = useState(false);

  //Mostrar modal de borrar
  const [showModalDelete, setShowModalDelete] = useState(false);
  //Categoria a borrar
   const [categoriaABorrar, setCategoriaABorrar] = useState(false);
 

  //Estado para saber si se esta editando o creando para manejar el evento como corresponda
  const [editing, setEditing] = useState(null);

  //Estado del formulario
  const [form, setForm] = useState({
    title: "",
    description: "",
    picture:  null,
    picturePreview: null,
  });

  //Abrir crear categoria
  const openModalNew = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      picture:  null,
      picturePreview: null,
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
      picturePreview: null,
    });

    setShowModal(true);
  };
  //Abrir Borrar:
  const openModalDelete = (categoria) =>{
      setCategoriaABorrar(categoria);
      setShowModalDelete(true);
  }

  //Cerrar modal
  const closeModal = () => {setShowModal(false)};
  //Cerrar modal borrar
  const closeModalDelete = () => {setShowModalDelete(false)}

  //Mantener sincronizado
  const handleChange = (e) => {
  const { name, value, files } = e.target;

    if (name === "picture" && files?.length > 0) {
      const file = files[0];
      //agregar previews
      setForm({
        ...form,
        picture: file,
        picturePreview: URL.createObjectURL(file),
      });
      return;
    }
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
    //chequeo si esta vacia la descripcion
    if (!form.description.trim()) {
      alert("La descripción es obligatoria");
      return;
    }
    //chequeo si hay una imagen
    if (!editing && !form.picture) {
      alert("Se necesita un imagen de forma obligatoria");
      return;
    }
    try {
      let categoryId = editing?.id;

      //Editar
      if (editing) {
        await fetch(`${API_URL}/categories/${categoryId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: "Bearer elias",
          },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
          }),
        });
        recargarCategorias()
      }

      //Crear
      else {
        const res = await fetch(`${API_URL}/categories/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: "Bearer elias",
          },
          body: JSON.stringify({
            title: form.title,
            description: form.description,
          }),
        });

        const data = await res.json();
        categoryId = data.id; // id de la respuesta, para poder asignar imagen,si es que hay
        recargarCategorias()
      }

      // Subir imagen
      if (form.picture instanceof File) {
        const fd = new FormData();
        fd.append("file", form.picture);

        await fetch(
          `${API_URL}/categories/${categoryId}/picture`,
          {
            method: "POST",
             headers: {
               Authorization: "Bearer elias",
          },
            body: fd,
          }
        );
        recargarCategorias()
      }

      closeModal();
    } catch (error) {
      console.error("Error al guardar la categoría:", error);
    }
  };
  //Handle de borrado
  const handleDelete = async (categoria) => {
    try {
      await fetch(`${API_URL}/categories/${categoria.id}`, {
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
    recargarCategorias()
  };

  return (
    <>
     <h1 className="text-2xl mb-2">Lista Categorias</h1>
     <div className="flex justify-between">              
           {/* Busqueda en tabla de categorias */}

          <button
            className="hidden md:block px-4 py-2 mb-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow text-base font-bold"
            onClick={openModalNew}
          >
              + Agregar categoría
          </button>
          <button
            className="block md:hidden px-4 py-2 mb-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow text-base font-bold"
            onClick={openModalNew}
          >
              +Categoría
          </button>
                    <SearchBar value={searchCat} onChange={setSearchCat} />
      </div>

    
    <section className="w-full">
      <div className="mx-auto max-w-7xl bg-gray-900">
        {/* Estilo en movil */}
        <div className="flex flex-col gap-3 md:hidden">
          {categoriasFiltrado.map((categoria) => (
            <div
              key={categoria.id}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex gap-4 items-start"
            >
              <img
                src={`${API_URL}${categoria.picture}`}
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
                    onClick={() => openModalDelete(categoria)}
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
              {categoriasFiltrado.map((categoria) => (
                <FilaCategorias 
                    key={categoria.id} 
                    categoria={categoria} 
                    openModalEdit={openModalEdit} 
                    openModalDelete={openModalDelete}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        {/* Modal */}
        {showModal && ( 
          <ModalCategorias form={form} handleChange={handleChange} handleSubmit={handleSubmit} closeModal={closeModal} editing={editing}/>
        )}
         {/* Modal de borrar*/}
        {showModalDelete && (
          <ModalDeleteCategorias
            closeModalDelete={closeModalDelete}
            categoriaABorrar={categoriaABorrar}
            handleDelete ={handleDelete }
          />
        )}
    </section>
    </>
  );
}