import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

export default function AlquileresTable({ alquileres, onEdit, onDelete }) {
  return (
    <table className="min-w-full border-collapse border border-gray-200 font-sans">
      <thead>
        <tr className="bg-gray-100">
          <th scope="col" className="border border-gray-300 px-4 py-2 text-black text-sm font-medium">
            Propiedad
          </th>
          <th scope="col" className="border border-gray-300 px-4 py-2 text-black text-sm font-medium">
            Dirección
          </th>
          <th scope="col" className="border border-gray-300 px-4 py-2 text-black text-sm font-medium">
            Usuario
          </th>
          <th scope="col" className="border border-gray-300 px-4 py-2 text-black text-sm font-medium">
            Email
          </th>
          <th scope="col" className="border border-gray-300 px-4 py-2 text-black text-sm font-medium">
            Check-in
          </th>
          <th scope="col" className="border border-gray-300 px-4 py-2 text-black text-sm font-medium">
            Check-out
          </th>
          <th scope="col" className="border border-gray-300 px-4 py-2 text-black text-sm font-medium">
            Precio Total
          </th>
          <th scope="col" className="border border-gray-300 px-4 py-2 text-black text-sm font-medium">
            Estado
          </th>
          <th scope="col" className="border border-gray-300 px-4 py-2 text-black text-sm font-medium">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        {alquileres.map((alquiler) => (
          <tr
            key={alquiler.id}
            className="text-center text-black hover:bg-gray-50 transition text-white hover:text-black"
          >
            <td className="border border-gray-300 px-4 py-2 text-sm">{alquiler.propiedad.nombre}</td>
            <td className="border border-gray-300 px-4 py-2 text-sm">{alquiler.propiedad.direccion}</td>
            <td className="border border-gray-300 px-4 py-2 text-sm">{alquiler.usuario.nombre}</td>
            <td className="border border-gray-300 px-4 py-2 text-sm">{alquiler.usuario.email}</td>
            <td className="border border-gray-300 px-4 py-2 text-sm">{alquiler.check_in}</td>
            <td className="border border-gray-300 px-4 py-2 text-sm">{alquiler.check_out}</td>
            <td className="border border-gray-300 px-4 py-2 text-sm">${alquiler.precio_total}</td>
            <td className="border border-gray-300 px-4 py-2 text-sm">{alquiler.estado}</td>
            <td className="border border-gray-300 px-4 py-2 flex justify-center items-center space-x-2">
              <button
                className="text-blue-600 hover:text-blue-800 border-none rounded"
                onClick={() => onEdit(alquiler)}
                title="Editar"
              >
                <AiOutlineEdit className="w-5 h-5" />
              </button>
              <button
                className="text-red-600 hover:text-red-800 border-none rounded"
                onClick={() => {
                  if (confirm("¿Estás seguro de eliminar este alquiler?")) {
                    onDelete(alquiler.id);
                  }
                }}
                title="Eliminar"
              >
                <AiOutlineDelete className="w-5 h-5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
