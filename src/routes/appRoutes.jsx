import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Productos from "../pages/Productos";
import Categorias from "../pages/Categorias";
import CategoriaFilter from "../components/categoriaComponent/CategoriaFilter";
import ProductPage from "../pages/ProductPage";
import LandingPage from "../pages/Landing";
import AdminProductos from "../pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/categorias/" element={<Categorias />} />
      <Route path="/categorias/:id" element={<CategoriaFilter />} />
      <Route path="/producto/:id" element={<ProductPage />} />
      <Route path="/admin" element={<AdminProductos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

// <Route path="*" element={<NotFound />} />; Siempre al final para rutas no encontradas.
