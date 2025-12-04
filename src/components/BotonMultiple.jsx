import { useState } from "react";

export default function BotonMultiple({ onChange }) {
  const opciones = [
    { label: "Productos", action: "productos" },
    { label: "Tags", action: "tags" },
    { label: "Categorías", action: "categorias" },
  ];

  const [seleccionado, setSeleccionado] = useState(opciones[0].action);

  const handleClick = (action) => {
    setSeleccionado(action);
    onChange(action); // notifica al padre qué opción se eligió
  };

  return (
    <div className="flex bg-gray-800 rounded-lg overflow-hidden w-full md:w-1/2">
      {opciones.map((opcion) => (
        <button
          key={opcion.action}
          onClick={() => handleClick(opcion.action)}
          className={`w-full md:w-1/3 px-2 py-1 font-bold leading-8 transition-colors duration-200
            ${
              seleccionado === opcion.action && seleccionado == "productos"
                ? "bg-indigo-600 text-white"
                : seleccionado === opcion.action && seleccionado == "tags"
                ? "bg-teal-600 text-white"
                : seleccionado === opcion.action && seleccionado == "categorias"
                ? "bg-orange-600 hover:bg-orange-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
        >
          {opcion.label}
        </button>
      ))}
    </div>
  );
}
