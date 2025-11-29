import { useNavigate, useParams } from "react-router-dom";
import ProductoForm from "../components/formularios/ProductoForm";

const API_URL = import.meta.env.VITE_API_URL;

export default function PageFormulario() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (data) => {
    try {
      // POST o PUT según si hay id
      const url = API_URL + (id ? `/products/${id}` : "/products");
      const method = id ? "PUT" : "POST";

      const body = {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        category_id: Number(data.category_id),
        tags_ids: data.tags_ids,
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "Bearer elias",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error creando producto:", errorText);
        return;
      }

      // Obtener el product_id (si es POST)
      const product = await res.json();
      const productId = id || product.id;
      console.log("Producto guardado con ID:", productId);
      // hasa aca llega ok la iamgen.
      console.log("imagen", data.pictures);
      // cargar imagen al endpoint de pictures productos
      if (data.pictures && data.pictures.length > 0) {
        await cargarImagenProducto(productId, data.pictures);

        navigate("/admin");
      }
    } catch (err) {
      console.error("Error de red:", err);
    }
  };

  const cargarImagenProducto = async (productId, pictures) => {
    const formData = new FormData();

    Array.from(pictures).forEach((file) => {
      console.log("Archivo:", file.name, file.type, file.size);

      formData.append("files", file);
    });

    const res = await fetch(`${API_URL}/products/${productId}/pictures`, {
      method: "POST",
      headers: {
        Authorization: "Bearer elias",
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error subiendo imágenes:", errorText);
    } else {
      console.log("Imágenes subidas correctamente");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <ProductoForm id={id} onEnvio={handleSubmit} />
    </div>
  );
}
