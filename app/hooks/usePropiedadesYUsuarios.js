import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export function usePropiedadesYUsuarios() {
  const [propiedades, setPropiedades] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: propiedades } = await supabase.from("propiedades").select("id, nombre");
        const { data: usuarios } = await supabase.from("usuarios").select("id, nombre");
        setPropiedades(propiedades || []);
        setUsuarios(usuarios || []);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { propiedades, usuarios, loading };
}
