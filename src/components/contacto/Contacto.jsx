import { useForm } from "react-hook-form";

export default function Contacto() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos del formulario:", data);
    alert("Formulario capturado correctamente... ¡Gracias por contactarnos!");
    reset();
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-lg bg-gray-900 text-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">
          Contáctanos
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Nombre</label>
            <input
              {...register("name", { required: true })}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name && (
              <span className="text-red-400">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Correo</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <span className="text-red-400">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Mensaje</label>
            <textarea
              {...register("message", { required: true })}
              className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500 h-32 resize-none"
            />
            {errors.message && (
              <span className="text-red-400">{errors.message.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold shadow-md transition"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}
