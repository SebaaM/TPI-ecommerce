import { useState, useContext } from "react";
import { CartContext } from "../context/cart";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/genericos/Footer";

export default function PagoJuegoPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { cartItems, getCartTotal } = useContext(CartContext);

  const [formData, setFormData] = useState({
    nombre: "",
    numeroTarjeta: "",
    vencimiento: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-start min-h-screen bg-gray-900 text-white py-20 p-6 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Productos seleccionados</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-400">No hay productos en el carrito.</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-4 border-b border-gray-700 pb-4"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={item.pictures}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded bg-gray-700"
                      />
                    </div>

                    {/* Información del producto */}
                    <div className="flex-1">
                      <span className="block font-semibold">{item.title}</span>
                      <span className="text-sm text-gray-400">
                        Cantidad: {item.quantity}
                      </span>
                      <span className="block text-sm text-gray-400 mt-1">
                        Precio unitario: ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* subtotal */}
                    <div className="text-right">
                      <span className="font-semibold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Formulario de pago */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/2">
          <h2 className="text-xl font-bold mb-4">Pago con MercadoPago</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">
                Nombre en la tarjeta
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">
                Número de tarjeta
              </label>
              <input
                type="text"
                name="numeroTarjeta"
                value={formData.numeroTarjeta}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="XXXX XXXX XXXX XXXX"
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-gray-300 mb-1">Vencimiento</label>
                <input
                  type="text"
                  name="vencimiento"
                  value={formData.vencimiento}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="MM/AA"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-300 mb-1">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123"
                />
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-4"
              disabled={cartItems.length === 0}
            >
              Confirmar Pago
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
