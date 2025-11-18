import { Catalogo } from "../components/Catalogo";
import Footer from "../components/genericos/Footer";

function Productos() {
  return (
    <div className="w-full min-h-screen bg-gray-800">
      <Catalogo
        apiUrl={"http://161.35.104.211:8000/products/"}
        apiToken={"elias"}
      ></Catalogo>
      <Footer />
    </div>
  );
}
export default Productos;
