import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./routes/appRoutes.jsx";
import { CartProvider } from "./context/cart.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

// strict mode puede ejecutar dos veces algunos metodos para detectar errores en el codigo.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);
