import React, { useContext, useEffect, useState } from 'react';
import { RoleContext } from '../../context/RoleContext';
import { AuthContext } from '../../context/AuthContext';

export const CompletarPerfilProductor = () => {
  const { sellerProfile, saveSellerProfile, sellerProfileLoading, sellerProfileError } = useContext(RoleContext);
  const { isAuthenticated, openAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    marca: sellerProfile?.marca || '',
    ubicacion: sellerProfile?.ubicacion || '',
    experiencia: sellerProfile?.experiencia || '',
    historia: sellerProfile?.historia || '',
    bio: sellerProfile?.bio || '',
    gps: '',
    coverImageUrl: sellerProfile?.coverImageUrl || '',
    fincaNombre: sellerProfile?.fincas?.[0]?.nombre || '',
    fincaUbicacion: sellerProfile?.fincas?.[0]?.ubicacion || '',
    fincaGps: sellerProfile?.fincas?.[0]?.gps || '',
    fincaDescripcion: sellerProfile?.fincas?.[0]?.descripcion || '',
  });
  const [submitError, setSubmitError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      marca: sellerProfile?.marca || prev.marca,
      ubicacion: sellerProfile?.ubicacion || prev.ubicacion,
      experiencia: sellerProfile?.experiencia || prev.experiencia,
      historia: sellerProfile?.historia || prev.historia,
      bio: sellerProfile?.bio || prev.bio,
      coverImageUrl: sellerProfile?.coverImageUrl || prev.coverImageUrl,
      fincaNombre: sellerProfile?.fincas?.[0]?.nombre || prev.fincaNombre,
      fincaUbicacion: sellerProfile?.fincas?.[0]?.ubicacion || prev.fincaUbicacion,
      fincaGps: sellerProfile?.fincas?.[0]?.gps || prev.fincaGps,
      fincaDescripcion: sellerProfile?.fincas?.[0]?.descripcion || prev.fincaDescripcion,
    }));
  }, [sellerProfile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    try {
      await saveSellerProfile({
        marca: formData.marca,
        ubicacion: formData.ubicacion,
        experiencia: formData.experiencia,
        historia: formData.historia,
        bio: formData.bio,
        gps: formData.gps,
        coverImageUrl: formData.coverImageUrl,
        firstFarm: {
          nombre: formData.fincaNombre,
          ubicacion: formData.fincaUbicacion,
          gps: formData.fincaGps,
          descripcion: formData.fincaDescripcion,
        },
      });
    } catch (error) {
      setSubmitError(error.message);
    }
  }

  if (!isAuthenticated) {
    return (
      <section className="surface-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
          Zona de venta
        </p>
        <h1 className="mt-3 font-display text-4xl text-soil-900">
          Antes de vender, inicia sesion o crea tu cuenta
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-soil-600">
          Seguimos manejando una sola cuenta para todo. Cuando entres, podras completar
          tu perfil productor, registrar tus fincas y publicar tus lotes.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" className="btn-primary" onClick={() => openAuth('register')}>
            Crear cuenta
          </button>
          <button type="button" className="btn-ghost" onClick={() => openAuth('login')}>
            Ya tengo cuenta
          </button>
        </div>
      </section>
    );
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
          <input className="field" name="ubicacion" value={formData.ubicacion} onChange={handleChange} placeholder="Ubicacion principal" required />
          <input className="field" name="experiencia" value={formData.experiencia} onChange={handleChange} placeholder="Experiencia" required />
          <input className="field" name="coverImageUrl" value={formData.coverImageUrl} onChange={handleChange} placeholder="URL de imagen de portada" />
          <textarea className="field min-h-[110px]" name="bio" value={formData.bio} onChange={handleChange} placeholder="Breve bio del productor o de la marca" />
          <textarea className="field min-h-[140px]" name="historia" value={formData.historia} onChange={handleChange} placeholder="Cuenta tu historia como productor" required />
        </div>

        <div className="space-y-4">
          <h2 className="font-display text-2xl text-soil-900">Primera finca</h2>
          <input className="field" name="fincaNombre" value={formData.fincaNombre} onChange={handleChange} placeholder="Nombre de la finca" required />
          <input className="field" name="fincaUbicacion" value={formData.fincaUbicacion} onChange={handleChange} placeholder="Ubicacion de la finca" required />
          <input className="field" name="fincaGps" value={formData.fincaGps} onChange={handleChange} placeholder="GPS opcional" />
          <textarea className="field min-h-[140px]" name="fincaDescripcion" value={formData.fincaDescripcion} onChange={handleChange} placeholder="Describe la finca y su contexto" />
        </div>

        {(submitError || sellerProfileError) && (
          <div className="xl:col-span-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError || sellerProfileError}
          </div>
        )}

        <div className="xl:col-span-2">
          <button type="submit" className="btn-primary" disabled={sellerProfileLoading}>
            {sellerProfileLoading ? 'Guardando perfil...' : 'Activar perfil y seguir a vender'}
          </button>
        </div>
      </form>
    </section>
  );
};
