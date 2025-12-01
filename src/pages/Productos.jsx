import { Catalogo } from "../components/Catalogo";

function Productos() {
  return (
    <div className="w-full min-h-screen bg-gray-800">
      <Catalogo
        apiUrl={"http://161.35.104.211:8000/products/"}
        apiToken={"elias"}
      ></Catalogo>
    </div>
  );
}
export default Productos;
