import { useFetchProduct } from "../utils/useFetchProduct";
import { useParams } from "react-router-dom";
export default function ProductDetail({urlImagen, titulo, description, price }) {
    //id del producto obtenido de a url
    const id = useParams().id;
    const { data: producto, loading, error } = useFetchProduct(id);
  
    if (loading) return <div className="h-[600px] w-full bg-gray-800 animate-pulse rounded-xl">Cargando...</div>;;
    if (error) return <div>Error: {error}</div>;
    if (!producto || producto=== "")
      return <div>No hay productos en esta categoría</div>;
   
  return (
    <div className="p-8 mt-16 mb-6 bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row gap-10 justify-items-center">

          {/* Imagen */}
          <div className="md:w-1/2">
            <div className="max-w-[230px] 
                            sm:aspect-3/4 sm:max-w-[300px] 
                            md:aspect-4/5 w-full md:max-w-90
                            rounded-lg bg-gray-700 overflow-hidden  mx-auto">
              <img 
                className="w-full h-full object-cover" 
                src={`http://161.35.104.211:8000${producto.pictures}`}
                alt={producto.titulo}
              />
            </div>
          </div>

          
          <div className="md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{producto.title}</h2>
              {/* Precio */}
              <p className="text-4xl font-bold text-green-400 mb-4">
                ${producto.price.toFixed(2)}
              </p>
              {/* Categorías del producto */}
              <div className="mb-6">
                <span className="font-semibold text-gray-300">Tags</span>
                <div className="flex gap-2 mt-2">
                  {producto.tags.map((tag,i) => (
                    <button 
                      key={i}
                      className="bg-gray-700 py-2 px-4 rounded-full hover:bg-gray-600"
                    >
                      {tag.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Descripción */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {producto.description}
              </p>
            </div>

            {/* Botones */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold">
                Añadir al carrito
              </button>
              <button className="flex-1 bg-gray-600 hover:bg-gray-500 py-3 rounded-lg font-bold">
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
