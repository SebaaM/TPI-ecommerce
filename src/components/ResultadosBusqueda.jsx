import { Link } from "react-router-dom";


export default function ResultadosBusqueda({ searchResults}) {

    return (
            <div className="pt-12 md:pt-0 absolute top-16 left-0 right-0 z-40 px-4">
                      <div className="bg-gray-900 p-4 rounded-lg shadow-xl border border-gray-700">
            
                        {searchResults.length === 0 ? (
                          <p className="text-gray-400">No se encontraron resultados</p>
                        ) : (
                          <div className="grid grid-cols-1 gap-3">
                            {searchResults.slice(0, 5).map(prod => (
                              <Link 
                                key={prod.id}
                                to={`/producto/${prod.id}`}
                                className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition"
                              >
                                <img
                                  src={`http://161.35.104.211:8000${prod.pictures}`}
                                  className="w-14 h-14 object-cover rounded-md"
                                />
                                <div>
                                  <p className="text-white font-semibold">{prod.title}</p>
                                  <p className="text-gray-400 text-sm">${prod.price}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
            </div>
    );

}
