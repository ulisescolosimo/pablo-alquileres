"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabase"

export default function NuevoAlquiler() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    propiedad_id: "",
    usuario_id: "",
    check_in: "",
    check_out: "",
    precio_total: "",
    estado: "reservado",
  });

  const [propiedades, setPropiedades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  // Cargar propiedades y usuarios
  useState(() => {
    async function fetchData() {
      const { data: propiedades } = await supabase.from("propiedades").select("id, nombre");
      const { data: usuarios } = await supabase.from("usuarios").select("id, nombre");
      setPropiedades(propiedades || []);
      setUsuarios(usuarios || []);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("alquileres").insert([
      {
        propiedad_id: formData.propiedad_id,
        usuario_id: formData.usuario_id,
        check_in: formData.check_in,
        check_out: formData.check_out,
        precio_total: parseFloat(formData.precio_total),
        estado: formData.estado,
      },
    ]);

    if (error) {
      console.error("Error al registrar el alquiler:", error.message);
    } else {
      alert("Alquiler registrado exitosamente");
      router.push("/alquileres"); // Redirige a la página de alquileres
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Registrar Nuevo Alquiler</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="propiedad_id" className="block mb-2 font-medium">
            Propiedad
          </label>
          <select
            name="propiedad_id"
            id="propiedad_id"
            value={formData.propiedad_id}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full text-black"
          >
            <option value="">Selecciona una propiedad</option>
            {propiedades.map((propiedad) => (
              <option key={propiedad.id} value={propiedad.id}>
                {propiedad.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="usuario_id" className="block mb-2 font-medium">
            Usuario
          </label>
          <select
            name="usuario_id"
            id="usuario_id"
            value={formData.usuario_id}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full text-black"
          >
            <option value="">Selecciona un usuario</option>
            {usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="check_in" className="block mb-2 font-medium">
            Check-in
          </label>
          <input
            type="date"
            name="check_in"
            id="check_in"
            value={formData.check_in}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full text-black"
          />
        </div>

        <div>
          <label htmlFor="check_out" className="block mb-2 font-medium">
            Check-out
          </label>
          <input
            type="date"
            name="check_out"
            id="check_out"
            value={formData.check_out}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full text-black"
          />
        </div>

        <div>
          <label htmlFor="precio_total" className="block mb-2 font-medium">
            Precio Total
          </label>
          <input
            type="number"
            name="precio_total"
            id="precio_total"
            value={formData.precio_total}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 w-full text-black"
          />
        </div>

        <div>
          <label htmlFor="estado" className="block mb-2 font-medium">
            Estado
          </label>
          <select
            name="estado"
            id="estado"
            value={formData.estado}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full text-black"
          >
            <option value="reservado">Reservado</option>
            <option value="finalizado">Finalizado</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Registrar Alquiler
        </button>
      </form>
    </main>
  );
}
