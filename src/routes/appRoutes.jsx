import { Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Productos from "../pages/Productos";
import Categorias from "../pages/Categorias";
import CategoriaFilter from "../components/categoriaComponent/CategoriaFilter";
import ProductPage from "../pages/ProductPage";
import LandingPage from "../pages/Landing";
import PageFormulario from "../pages/Formulario";
import ContactoPage from "../pages/ContactoPage";
import Login from "../pages/Login";
import AdminProductos from "../pages/Admin";
import { Navigate } from "react-router-dom";
import { useState } from "react";
function App() {
    //obtener estado de login 
    const [logged, setLogged] = useState(
    localStorage.getItem("userLogged") === "true"
    );
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/categorias/" element={<Categorias />} />
      <Route path="/categorias/:id" element={<CategoriaFilter />} />
      <Route path="/producto/:id" element={<ProductPage />} />
      <Route path="/admin" element={logged ? <AdminProductos /> : <Navigate to="/" />} />
      <Route path="/admin/crearProducto" element={logged ? <PageFormulario/> : <Navigate to="/" />} />
      <Route path="/admin/editarProducto/:id" element={logged ? <PageFormulario/> : <Navigate to="/"/> } />
      <Route path="/contacto" element={<ContactoPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;