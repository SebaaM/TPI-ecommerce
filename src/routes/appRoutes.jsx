import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Productos from "../pages/Productos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos/>}/>
      {/*<Route path="*" element={<NotFound />} />*/}
    </Routes>
  );
}

export default App;
// <Route path="/product/:id" element={<Product />} />
// <Route path="*" element={<NotFound />} />; Siempre al final para rutas no encontradas.
