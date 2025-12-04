import ProductDetail from '../components/ProductDetail';
import Navbar from '../components/Navbar';
import Footer from '../components/genericos/Footer';

function ProductPage() {
    return (
        <div className="flex flex-col min-h-screen w-full bg-gray-800">
            <Navbar />
            <main className="flex-1">
                <ProductDetail />
            </main>
            <Footer />
        </div>
    );
}
export default ProductPage;