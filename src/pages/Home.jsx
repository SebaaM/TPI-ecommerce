import { Catalogo } from "../components/Catalogo";
import Footer from "../components/genericos/Footer";
import Navbar from "../components/Navbar";
// Agregar import navbar.

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1b1d1f]">
      <div className="w-full min-h-screen bg-gray-800 grow">
        <Navbar />
        <Catalogo
          apiUrl={"http://161.35.104.211:8000/products/"}
          apiToken={"elias"}
        ></Catalogo>
      </div>
      <Footer />
    </div>
  );
}
export default Home;
