import ProductDetail from '../components/ProductDetail';
import Navbar from '../components/Navbar';
import Footer from '../components/genericos/Footer';
import { useFetchProduct } from "../utils/useFetchProduct";
import ResultadosBusqueda from '../components/ResultadosBusqueda';
import { useState } from "react";
function ProductPage(){
    // Fetch de productos
      const {
        data: products,
        loading: loadingProducts,
        error: errorProducts,
    } = useFetchProduct();
    
    //usado en nav Bar y barra de busqueda
    const [searchInput, setSearchInput] = useState("");

    // filtrado de productos para sugerencias
    const searchResults =  searchInput.length > 0
        ? products.filter(p => 
            p.title.toLowerCase().includes(searchInput.toLowerCase())
        )
        : [];
    



    return (
             <div className="w-full min-h-screen bg-gray-800">
                  <Navbar value={searchInput} onChange={setSearchInput}/>
                    {/* Componente que muestra resultados de la busqueda */}
                   {searchInput && (
                    <ResultadosBusqueda 
                        searchResults={searchResults}
                    />
                    )}
                  <ProductDetail/>
                  <Footer className="fixed bottom-0 left-0"/>
            </div>
    );
}
export default ProductPage;