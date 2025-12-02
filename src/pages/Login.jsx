import { useState } from "react";
import { GoogleLoginMock } from "../components/admin/GoogleLogin";
import Navbar from "../components/Navbar";
import Footer from "../components/genericos/Footer";
export default function Login() {
  const [user, setUser] = useState({ logged: false });

  return (
    <div className="min-h-screen flex flex-col">
    <Navbar/>
    <div className="grow  w-full flex flex-col items-center mt-30 md:mt-10">
      <GoogleLoginMock setUser={setUser} />
    </div>
    <Footer/>
    </div>
  );
}
