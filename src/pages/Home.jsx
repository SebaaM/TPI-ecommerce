import { Catalogo } from '../pages/Catalogo'
function Home(){
    return (
             <div className="w-full min-h-screen bg-gray-800">
                  <Catalogo apiUrl={"http://161.35.104.211:8000/products/"} apiToken={"elias"}></Catalogo>
            </div>
    );
}
export default Home;