import ProductDetail from '../components/ProductDetail';
import Navbar from '../components/Navbar';
import Footer from '../components/genericos/Footer';

function ProductPage(){

    return (
             <div className="w-full min-h-screen bg-gray-800">
                  <Navbar/>
                  <ProductDetail/>
                  <Footer className="fixed bottom-0 left-0"/>
            </div>
    );
}
export default ProductPage;