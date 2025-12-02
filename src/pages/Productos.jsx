import { Catalogo } from "../components/Catalogo";

const API_URL = import.meta.env.VITE_API_URL;

function Productos() {
  return (
    <div className="w-full min-h-screen bg-gray-800">
      <Catalogo
        apiUrl={`${API_URL}/products/`}
        apiToken={"elias"}
      ></Catalogo>
    </div>
  );
}
export default Productos;
