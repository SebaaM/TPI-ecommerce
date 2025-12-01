import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetchCategoria } from "../../utils/useFetchCategoria";
import { useFetchProduct } from "../../utils/useFetchProduct";
import { useFetchTags } from "../../utils/useFetchTags";
import { Link } from "react-router-dom";

export default function ProductoForm({ id, onEnvio }) {
  const { data: producto } = useFetchProduct(id);
  const { data: categorias } = useFetchCategoria();
  const { data: tags } = useFetchTags();
  const API_URL = import.meta.env.VITE_API_URL;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category_id: "",
      tag_ids: [],
    },
  });

  const [previewImages, setPreviewImages] = useState([]);

  // cargar datos para editar
  useEffect(() => {
    if (producto) {
      setValue("title", producto.title || "");
      setValue("description", producto.description || "");
      setValue("price", producto.price || 0);
      setValue("category_id", producto.category_id || "");
      setValue("tag_ids", producto.tags?.map((t) => t.id) || []);
      if (producto.pictures && producto.pictures.length > 0) {
        setPreviewImages(producto.pictures.map((p) => API_URL + p)); // array de strings con URLs
      }
    }
  }, [producto, setValue]);

  // preview en carga
  const pictures = watch("pictures");
  useEffect(() => {
    if (pictures && pictures.length > 0) {
      const previews = Array.from(pictures).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages(previews);
    }
  }, [pictures]);

  // envio del formulario
  const onSubmit = (data) => {
    const selectedTags = data.tag_ids ? [].concat(data.tag_ids) : [];
    const body = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      category_id: Number(data.category_id),
      tag_ids: selectedTags.map(Number),
      pictures: Array.from(data.pictures || []),
    };
    onEnvio(body);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-center">
        {id ? "Editar producto" : "Crear nuevo producto"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm md:text-xl font-semibold mb-2">
            Título
          </label>
          <input
            {...register("title", { required: "El título es obligatorio" })}
            placeholder="Ingresa el título del videojuego"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
          {errors.title && (
            <span className="text-red-400">{errors.title.message}</span>
          )}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm md:text-xl font-semibold mb-2">
            Descripción
          </label>
          <textarea
            {...register("description", {
              required: "La descripción es obligatoria",
            })}
            placeholder="Ingresa una descripción del videojuego"
            rows={3}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
          {errors.description && (
            <span className="text-red-400">{errors.description.message}</span>
          )}
        </div>

        {/* Precio y Categoría */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4">
            <label className="block text-sm md:text-xl font-semibold mb-2">
              Precio
            </label>
            <input
              type="number"
              {...register("price", {
                required: "El precio es obligatorio",
                valueAsNumber: true,
                min: 0,
              })}
              placeholder="Precio..."
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.price && (
              <span className="text-red-400">{errors.price.message}</span>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <label className="block text-sm md:text-xl font-semibold mb-2">
              Categoría
            </label>
            <select
              {...register("category_id", {
                required: "La categoría es obligatoria",
                valueAsNumber: true,
              })}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Seleccionar categoría</option>
              {categorias?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <span className="text-red-400">{errors.category_id.message}</span>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm md:text-xl font-semibold mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-3">
            {tags?.map((tag) => {
              const selectedTags = watch("tag_ids") || [];
              const isChecked = selectedTags.includes(tag.id);

              return (
                <label
                  key={tag.id}
                  className={`flex items-center gap-2 px-3 py-1 rounded-md cursor-pointer
                ${
                  isChecked
                    ? "border-green-400 shadow-[0_0_10px_#22c55e]"
                    : "border-gray-700 hover:bg-gray-700"
                }
                bg-gray-800 border`}
                >
                  <input
                    type="checkbox"
                    value={tag.id}
                    checked={isChecked}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setValue("tag_ids", [...selectedTags, tag.id]);
                      } else {
                        setValue(
                          "tag_ids",
                          selectedTags.filter((id) => id !== tag.id)
                        );
                      }
                    }}
                    className="h-4 w-4"
                  />
                  {tag.title}
                </label>
              );
            })}
          </div>
        </div>

        {/* Imágenes */}
        <div>
          <label className="block text-sm md:text-xl font-semibold mb-2">
            Imágenes
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register("pictures")}
            className="w-full md:w-1/2 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />

          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Imagen Producto-${idx}`}
                  className="w-full h-32 object-cover rounded-md border border-gray-700"
                />
              ))}
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="flex flex-col md:flex-row justify-end gap-4">
          <button
            type="submit"
            className={`w-full md:w-auto px-6 py-3 rounded-md text-white font-semibold shadow-md transition
          ${
            id
              ? "bg-yellow-600 hover:bg-yellow-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          >
            {id ? "Actualizar producto" : "Crear producto"}
          </button>
          <Link
            to="/admin/productos"
            className="w-full md:w-auto px-6 py-3 rounded-md text-white font-semibold shadow-md transition bg-gray-500 hover:bg-gray-700 text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
