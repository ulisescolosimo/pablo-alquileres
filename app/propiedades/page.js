import { supabase } from "../utils/supabase";

export default async function Propiedades() {
  // Fetch de propiedades desde Supabase
  const { data: propiedades, error } = await supabase.from("propiedades").select("*");

  if (error) {
    console.error("Error al cargar las propiedades:", error.message);
    return <div>Error al cargar las propiedades.</div>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Propiedades</h1>
      <ul className="space-y-4">
        {propiedades.map((propiedad) => (
          <li key={propiedad.id} className="border p-4 rounded-md">
            <h2 className="text-lg font-semibold">{propiedad.nombre}</h2>
            <p>{propiedad.direccion}</p>
            <p>{propiedad.descripcion}</p>
            <p>Capacidad: {propiedad.capacidad}</p>
            <p>Precio por noche: ${propiedad.precio_por_noche}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
