import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFetchCategoria } from "../../utils/useFetchCategoria";
import { useFetchProduct } from "../../utils/useFetchProduct";
import { useFetchTags } from "../../utils/useFetchTags";

export default function ProductoForm({ id, onEnvio }) {
  const { data: producto } = useFetchProduct(id);
  const { data: categorias } = useFetchCategoria();
  const { data: tags } = useFetchTags();

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

  const selectedTags = watch("tag_ids") || [];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-700 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {id ? "Editar producto" : "Crear nuevo producto"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-semibold mb-2">Título</label>
          <input
            {...register("title", { required: "El título es obligatorio" })}
            placeholder="Ingresa el título del videojuego"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Descripción
          </label>
          <textarea
            {...register("description", {
              required: "La descripción es obligatoria",
            })}
            placeholder="Ingresa una descripción del videojuego"
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-semibold mb-2">Precio</label>
          <input
            type="number"
            {...register("price", {
              required: "El precio es obligatorio",
              valueAsNumber: true,
            })}
            placeholder="Precio..."
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-semibold mb-2">Categoría</label>
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
          {errors.category_id && <span>{errors.category_id.message}</span>}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold mb-2">Tags</label>
          <div className="flex flex-wrap gap-3">
            {tags?.map((tag) => (
              <label
                key={tag.id}
                className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-800 border border-gray-700 cursor-pointer hover:bg-gray-700"
              >
                <input
                  type="checkbox"
                  value={tag.id}
                  checked={selectedTags.includes(tag.id)}
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
            ))}
          </div>
        </div>

        {/* Imágenes */}
        <div>
          <label className="block text-sm font-semibold mb-2">Imágenes</label>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register("pictures")}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />

          {/* Preview */}
          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`preview-${idx}`}
                  className="w-full h-32 object-cover rounded-md border border-gray-700"
                />
              ))}
            </div>
          )}
        </div>

        {/* Botón */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold shadow-md transition"
          >
            {id ? "Actualizar producto" : "Crear producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
