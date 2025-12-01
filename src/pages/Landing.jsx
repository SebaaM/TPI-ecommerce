import { useFetchCategoria } from "../utils/useFetchCategoria";
import { useFetchProduct } from "../utils/useFetchProduct";
import CategoriaLanding from "../components/landing/CategoriaLanding";
import Carousel from "../components/landing/Carousel";
import Navbar from "../components/Navbar";
import Footer from "../components/genericos/Footer";
import Loader from "../components/genericos/Loader";

export default function LandingPage() {
  // Fetch de categorías
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetchCategoria();

  // Fetch de productos
  const {
    data: products,
    loading: loadingProducts,
    error: errorProducts,
  } = useFetchProduct();

  const ofertas = products.length
    ? products.filter((product) =>
        product.tags.some((tag) => tag.title === "oferta")
      )
    : [];



  return (
    <div>
      <Navbar />
    
       {/* Si hay un error */}
      { (errorCategories || errorProducts ) && (<div>Error al cargar datos</div>)
      }
       {/* Cargando */}
        {(loadingCategories || loadingProducts)&& (
            <div      
            className="w-full bg-gray-950 animate-pulse min-h-screen"
            >
            <Loader/>
            </div>
        )}
        {/* No esta cargando pero no hay productos*/}
          {!(loadingCategories || loadingProducts) && (!products || products.length === 0) && (
          <div className="text-white py-10"> No hay productos cargados</div>
        )}

       {/* No esta cargando y hay productos */ }
       {!(loadingCategories || loadingProducts) && products && products.length > 0 && (
      <div className="bg-gray-950 text-white   px-6 py-20">
        <header className="text-center mb-12">
          <h1 className="sm:text-5xl text-4xl font-bold mb-2">
            Bienvenidos a Arcadia Store
          </h1>
          <p className="sm:text-lg text-md text-gray-400">
            Juegos increibles al mejor precio
          </p>
        </header>
        <div className="">
          <Carousel products={ofertas} />
        </div>
        {/*Categorias: <CategoriaLanding key={cat.id} {...cat} /> */}
        <header className="text-center mb-12">
          <h1 className="sm:text-5xl text-4xl font-bold mb-2">
            Explorá por categoría
          </h1>
          <p className="sm text-lg text-md text-gray-400">
            Descubrí mundos abiertos, RPGs y más
          </p>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {categories.map((cat) => (
            <CategoriaLanding
              key={cat.id}
              title={cat.title}
              description={cat.description}
              picture={cat.picture}
              id={cat.id}
            />
          ))}
        </section>
      </div>
       )}
      <Footer />
    </div>
  );
}
