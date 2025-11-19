import { Catalogo } from '../components/Catalogo'
import ProductDetail from '../components/ProductDetail';
import Navbar from '../components/Navbar';
import Footer from '../components/genericos/Footer';
function ProductPage(){
    return (
             <div className="w-full min-h-screen bg-gray-800">
                  <Navbar/>
                  <ProductDetail id={491} urlImagen={"http://161.35.104.211:8000/uploads/product_491_9fae5839-af41-4230-b96c-c00343b7108b.jpeg"} titulo={"The Legend of Zelda: Tears of the Kingdom"} description={"Explorá un vasto mundo abierto lleno de secretos y desafíos."} price={69.99}/>
                  <Footer/>
            </div>
    );
}
export default ProductPage;