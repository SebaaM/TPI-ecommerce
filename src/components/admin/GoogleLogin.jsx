import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
export function GoogleLoginMock() {
  const { login } = useContext(AuthContext);
  //inicializar el navigate
  const navigate = useNavigate();

  //Chequeo de campos vacios
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  //login con credenciales
  function handleMockLogin(e) {
    e.preventDefault();
    
    if (!email || !password) {
      alert("Completa con tu email y contraseña");
      return;
    }
    // Simula que son credenciales válidas
    //Login actualiza el contexto
    login();
    navigate("/admin");
  }
  //login con Google por separado, no depende de los valores del formulario
    function handleGoogleLogin(e) {
    e.preventDefault();

    login();
    navigate("/admin");
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tigh md:text-2xl text-white">
                    Ingresa a tu cuenta
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-mediumtext-white">Tu mail</label>
                        <input type="email" 
                               name="email" 
                               id="email" 
                               className="border rounded-lg focus:ring-primary-600 
                                          focus:border-primary-600 block w-full p-2.5 
                                          bg-gray-700 border-gray-600 placeholder-gray-400
                                          text-white focus:ring-blue-500 focus:border-blue-500" 
                              placeholder="ejemplo@ejemplo.com" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium  text-white">Password</label>
                        <input type="password" 
                               name="password" 
                               id="password" 
                               placeholder="••••••••" 
                               className="border rounded-lg focus:ring-primary-600 
                                          focus:border-primary-600 block w-full p-2.5 
                                          bg-gray-700 border-gray-600 placeholder-gray-400 
                                          text-white focus:ring-blue-500 focus:border-blue-500" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required=""/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border rounded  focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className=" text-gray-300">Recordar cuenta</label>
                            </div>
                        </div>
                        <a href="#" className="ml-3 text-sm font-medium text-primary-600 hover:underline text-green-600">Recuperar contraseña</a>
                    </div>
                    <button type="button"
                            onClick={handleMockLogin}
                            className="w-full text-white bg-green-700 
                                      hover:bg-primary-700 focus:ring-4 
                                      focus:outline-none focus:ring-primary-300 
                                      font-medium rounded-lg text-sm px-5 py-2.5 
                                      text-center bg-primary-600 hover:bg-green-900">
                                        Sign in
                    </button>
                    <div className="flex justify-center mt-6">
                  <button
                      type="button" 
                      onClick={handleGoogleLogin}
                      className="flex items-center justify-center gap-3 w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-gray-200 bg-white"
                  >
                      <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="google"
                      className="w-5 h-5"
                      />
                      <span className="text-center text-gray-700 font-medium">
                            Continuar con Google
                      </span>
                  </button>
                  </div>
                </form>
            </div>
        </div>
    </div>
  );
}
