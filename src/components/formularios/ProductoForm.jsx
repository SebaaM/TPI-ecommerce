import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchCategoria } from "../../utils/useFetchCategoria";
import { useFetchProduct } from "../../utils/useFetchProduct";
import { useFetchTags } from "../../utils/useFetchTags";

export default function ProductoForm({ id, onEnvio }) {
  const { data: producto, loading: loadingProducto } = useFetchProduct(id);

  useEffect(() => {
    if (producto) {
      setFormData({
        title: producto.title || "",
        description: producto.description || "",
        price: producto.price || "",
        category_id: producto.category_id || "",
        pictures: [],
        tags: producto.tags?.map((t) => t.id) || [],
      });
    }
  }, [producto]);

  const {
    data: categorias,
    loadingCategoria,
    errorCategoria,
  } = useFetchCategoria();
  const { data: tags, loading: loadingTags, error: errorTags } = useFetchTags();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    pictures: [],
    tags: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  // 🔹 Manejo de inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Manejo de archivos + preview
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, pictures: files });

    // Crear previews
    const previews = files?.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // 🔹 Manejo de tags
  const handleTagChange = (id) => {
    setFormData((prev) => {
      const alreadySelected = prev.tags.includes(id);
      return {
        ...prev,
        tags: alreadySelected
          ? prev.tags.filter((t) => t !== id)
          : [...prev.tags, id],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit prop:", onEnvio);

    onEnvio(formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Crear nuevo producto
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título */}
        <div>
          <label className="block text-sm font-semibold mb-2">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ingresa el título del videojuego"
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ingresa una descripción del videojuego"
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-semibold mb-2">Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Precio..."
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-semibold mb-2">Categoría</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Seleccionar categoría</option>
            {categorias?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
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
                  checked={formData.tags.includes(tag.id)}
                  onChange={() => handleTagChange(tag.id)}
                  className="accent-indigo-500"
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
            name="pictures"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />

          {/* Preview */}
          {previewImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {previewImages?.map((src, idx) => (
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
            Crear producto
          </button>
        </div>
      </form>
    </div>
  );
}
