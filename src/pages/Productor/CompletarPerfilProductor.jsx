import React, { useContext, useState } from 'react';
import { RoleContext } from '../../context/RoleContext';

export const CompletarPerfilProductor = () => {
  const { sellerProfile, saveSellerProfile } = useContext(RoleContext);
  const [formData, setFormData] = useState({
    marca: sellerProfile.marca || '',
    telefono: sellerProfile.telefono || '',
    ubicacion: sellerProfile.ubicacion || '',
    experiencia: sellerProfile.experiencia || '',
    historia: sellerProfile.historia || '',
    fincaNombre: sellerProfile.fincas?.[0]?.nombre || '',
    fincaUbicacion: sellerProfile.fincas?.[0]?.ubicacion || '',
    fincaGps: sellerProfile.fincas?.[0]?.gps || '',
    fincaDescripcion: sellerProfile.fincas?.[0]?.descripcion || '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveSellerProfile({
      ...sellerProfile,
      marca: formData.marca,
      telefono: formData.telefono,
      ubicacion: formData.ubicacion,
      experiencia: formData.experiencia,
      historia: formData.historia,
      activeSeller: true,
      fincas: [
        {
          id: sellerProfile.fincas?.[0]?.id || Date.now(),
          nombre: formData.fincaNombre,
          ubicacion: formData.fincaUbicacion,
          gps: formData.fincaGps,
          descripcion: formData.fincaDescripcion,
        },
      ],
    });
  };

  return (
    <section className="surface-card">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
        Activar perfil vendedor
      </p>
      <h1 className="mt-3 font-display text-4xl text-soil-900">
        Antes de vender, completa tu perfil y registra tu primera finca
      </h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-soil-600">
        Seguimos manejando una sola cuenta. Lo unico que cambia es que, para publicar
        lotes, necesitamos la informacion publica del vendedor y al menos una finca
        asociada.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-soil-900">Perfil publico</h2>
          <input className="field" name="marca" value={formData.marca} onChange={handleChange} placeholder="Marca o nombre comercial" required />
          <input className="field" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Telefono o WhatsApp" required />
          <input className="field" name="ubicacion" value={formData.ubicacion} onChange={handleChange} placeholder="Ubicacion principal" required />
          <input className="field" name="experiencia" value={formData.experiencia} onChange={handleChange} placeholder="Experiencia" required />
          <textarea className="field min-h-[140px]" name="historia" value={formData.historia} onChange={handleChange} placeholder="Cuenta tu historia como productor" required />
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-2xl text-soil-900">Primera finca</h2>
          <input className="field" name="fincaNombre" value={formData.fincaNombre} onChange={handleChange} placeholder="Nombre de la finca" required />
          <input className="field" name="fincaUbicacion" value={formData.fincaUbicacion} onChange={handleChange} placeholder="Ubicacion de la finca" required />
          <input className="field" name="fincaGps" value={formData.fincaGps} onChange={handleChange} placeholder="GPS opcional" />
          <textarea className="field min-h-[140px]" name="fincaDescripcion" value={formData.fincaDescripcion} onChange={handleChange} placeholder="Describe la finca y su contexto" />
        </div>

        <div className="xl:col-span-2">
          <button type="submit" className="btn-primary">
            Activar perfil y seguir a vender
          </button>
        </div>
      </form>
    </section>
  );
};
