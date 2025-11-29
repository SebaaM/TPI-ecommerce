import { useNavigate, useParams } from "react-router-dom";
import ProductoForm from "../components/formularios/ProductoForm";
const API_URL = import.meta.env.VITE_API_URL;

export default function PageFormulario() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (formData) => {
    const url = API_URL + (id ? `/products/${id}` : "/products");
    const method = id ? "PUT" : "POST";

    const body = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      category_id: formData.category_id,
      tags_ids: formData.tags.map((tag) => tag.id),
      pictures: formData.pictures ? formData.pictures.map((pic) => pic) : [],
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

    if (res.ok) {
      navigate("/admin");
    } else {
      const resClone = res.clone();
      const errorData = await res.json();
      const errorText = await resClone.text();
      console.error("Error JSON:", errorData);
      console.error("Error texto:", errorText);
      console.error("HTTP Error:", res.status, res.statusText);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <ProductoForm id={id} onEnvio={handleSubmit} />
    </div>
  );
}
