"use client";

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import AlquileresTable from "../components/AlquileresTable";
import CustomToastContainer from "../components/ToastContainer";
import { toast } from "react-toastify";
import ModalCrearAlquiler from "../components/ModalCrearAlquiler";
import ModalEditarAlquiler from "../components/ModalEditarAlquiler";
import { AiOutlinePlus } from "react-icons/ai";

export default function Alquileres() {
  const [alquileres, setAlquileres] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false); // Modal para crear
  const [showEditModal, setShowEditModal] = useState(false); // Modal para editar
  const [selectedAlquiler, setSelectedAlquiler] = useState(null); // Datos del alquiler a editar

  useEffect(() => {
    fetchAlquileres();
  }, []);

  const fetchAlquileres = async () => {
    const { data, error } = await supabase.from("alquileres").select(`
      id,
      check_in,
      check_out,
      precio_total,
      estado,
      propiedad:propiedad_id(nombre, direccion),
      usuario:usuario_id(nombre, email)
    `);
    if (error) console.error("Error al cargar los alquileres:", error.message);
    else setAlquileres(data || []);
  };

  // Función para manejar la creación de un nuevo alquiler
  const handleCreateSubmit = async (formData) => {
    const { error } = await supabase.from("alquileres").insert([formData]);
    if (error) {
      toast.error("Error al crear el alquiler");
      return false;
    }
    toast.success("Alquiler creado exitosamente");
    fetchAlquileres();
    return true;
  };

  // Función para manejar la edición de un alquiler
  const handleEditSubmit = async (formData) => {
    const { error } = await supabase
      .from("alquileres")
      .update(formData)
      .eq("id", selectedAlquiler.id);
    if (error) {
      toast.error("Error al actualizar el alquiler");
      return false;
    }
    toast.success("Alquiler actualizado exitosamente");
    fetchAlquileres();
    return true;
  };

  // Función para eliminar un alquiler
  const handleDelete = async (id) => {
    const { error } = await supabase.from("alquileres").delete().eq("id", id);
    if (error) {
      toast.error("Error al eliminar el alquiler");
    } else {
      toast.success("Alquiler eliminado");
      setAlquileres((prev) => prev.filter((a) => a.id !== id));
    }
  };

  // Abrir modal de edición
  const handleEdit = (alquiler) => {
    setSelectedAlquiler(alquiler);
    setShowEditModal(true);
  };

  return (
    <main className="p-8">
      <CustomToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-white">Relevamiento de Alquileres</h1>
      <AlquileresTable alquileres={alquileres} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Botón flotante para crear */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 flex items-center justify-center"
        onClick={() => setShowCreateModal(true)}
        aria-label="Agregar nuevo alquiler"
      >
        <AiOutlinePlus className="w-6 h-6" />
      </button>

      {/* Modal para crear */}
      <ModalCrearAlquiler
        showModal={showCreateModal}
        setShowModal={setShowCreateModal}
        onSubmit={handleCreateSubmit}
      />

      {/* Modal para editar */}
      <ModalEditarAlquiler
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        initialData={selectedAlquiler}
        onSubmit={handleEditSubmit}
      />
    </main>
  );
}
