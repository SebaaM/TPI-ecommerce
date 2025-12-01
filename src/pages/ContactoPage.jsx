import Navbar from "../components/Navbar";
import Footer from "../components/genericos/Footer";
import Contacto from "../components/contacto/Contacto";

export default function ContactoPage() {
  return (
    <div className="flex flex-col  min-h-screen py-6 bg-slate-950 text-white">
      <Navbar />
      <Contacto />
      <Footer />
    </div>
  );
}
