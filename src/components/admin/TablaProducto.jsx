import TablaFila from "./TablaFila";

export default function TablaProducto({ productos, onDelete }) {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Precio</th>
            <th className="px-4 py-2 text-left">Categoría</th>
            <th className="px-4 py-2 text-left">Tags</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 text-gray-200">
          {productos.map((juego) => (
            <TablaFila key={juego.id} juego={juego} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
