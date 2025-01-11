"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePropiedadesYUsuarios } from "../hooks/usePropiedadesYUsuarios";

export default function ModalEditarAlquiler({ showModal, setShowModal, initialData, onSubmit }) {
  const { propiedades, usuarios, loading } = usePropiedadesYUsuarios();
  const [formData, setFormData] = useState({
    propiedad_id: "",
    usuario_id: "",
    check_in: "",
    check_out: "",
    precio_total: "",
    estado: "reservado",
  });

  useEffect(() => {
    if (showModal && initialData && !loading) {
      // Configurar valores iniciales del formulario
      setFormData({
        propiedad_id: initialData.propiedad?.id || "",
        usuario_id: initialData.usuario?.id || "",
        check_in: initialData.check_in || "",
        check_out: initialData.check_out || "",
        precio_total: initialData.precio_total || "",
        estado: initialData.estado || "reservado",
      });
    }
  }, [showModal, initialData, loading]); // Se asegura de que `propiedades` y `usuarios` hayan cargado

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(formData);

    if (success) {
      setShowModal(false);
      toast.success("Alquiler actualizado exitosamente");
    } else {
      toast.error("Error al actualizar el alquiler");
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-1/3">
        <h2 className="text-xl font-bold mb-4 text-black">Editar Alquiler</h2>
        {loading ? (
          <p className="text-center text-black">Cargando datos...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Select para Propiedad */}
            <div>
              <label htmlFor="propiedad_id" className="block mb-2 font-medium text-black">
                Propiedad
              </label>
              <select
                name="propiedad_id"
                value={formData.propiedad_id}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full text-black"
                required
              >
                <option value="">Selecciona una propiedad</option>
                {propiedades.map((propiedad) => (
                  <option key={propiedad.id} value={propiedad.id}>
                    {propiedad.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Select para Usuario */}
            <div>
              <label htmlFor="usuario_id" className="block mb-2 font-medium text-black">
                Usuario
              </label>
              <select
                name="usuario_id"
                value={formData.usuario_id}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full text-black"
                required
              >
                <option value="">Selecciona un usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Campos para Check-in y Check-out */}
            <div>
              <label htmlFor="check_in" className="block mb-2 font-medium text-black">
                Check-in
              </label>
              <input
                type="date"
                name="check_in"
                value={formData.check_in}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full text-black"
                required
              />
            </div>
            <div>
              <label htmlFor="check_out" className="block mb-2 font-medium text-black">
                Check-out
              </label>
              <input
                type="date"
                name="check_out"
                value={formData.check_out}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full text-black"
                required
              />
            </div>

            {/* Campo para Precio Total */}
            <div>
              <label htmlFor="precio_total" className="block mb-2 font-medium text-black">
                Precio Total
              </label>
              <input
                type="number"
                name="precio_total"
                value={formData.precio_total}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full text-black"
                required
              />
            </div>

            {/* Select para Estado */}
            <div>
              <label htmlFor="estado" className="block mb-2 font-medium text-black">
                Estado
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="border rounded px-4 py-2 w-full text-black"
              >
                <option value="reservado">Reservado</option>
                <option value="finalizado">Finalizado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Guardar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
