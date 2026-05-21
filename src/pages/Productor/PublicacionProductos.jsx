import React, { useContext, useEffect, useMemo, useState } from 'react';
import { RoleContext } from '../../context/RoleContext';
import { ProductosContext } from '../../context/ProductosContext';
import { AuthContext } from '../../context/AuthContext';

const initialProcess = [
  { etapa: 'Siembra', obligatorio: true, resultado: '', descripcion: '' },
  { etapa: 'Cultivo', obligatorio: true, resultado: '', descripcion: '' },
  { etapa: 'Cosecha', obligatorio: true, resultado: '', descripcion: '' },
  { etapa: 'Lavado y secado', obligatorio: true, resultado: '', descripcion: '' },
  { etapa: 'Tostado', obligatorio: false, resultado: '', descripcion: '' },
];

export const PublicacionProductos = () => {
  const { setCurrentPage } = useContext(RoleContext);
  const { addProducto } = useContext(ProductosContext);
  const { sellerProfile } = useContext(RoleContext);
  const { isAuthenticated, openAuth } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    cantidad: '',
    variedad: 'Arabica',
    fincaId: sellerProfile?.fincas?.[0]?.id || '',
    tipoGrano: '',
    tueste: 'Medio',
    descripcion: '',
    foto:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b8d5?w=900&h=700&fit=crop',
    procesos: initialProcess,
  });
  const fincas = useMemo(() => sellerProfile?.fincas || [], [sellerProfile?.fincas]);

  useEffect(() => {
    if (!formData.fincaId && fincas.length > 0) {
      setFormData((prev) => ({ ...prev, fincaId: fincas[0].id }));
    }
  }, [fincas, formData.fincaId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updateProceso = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      procesos: prev.procesos.map((proceso, procesoIndex) =>
        procesoIndex === index ? { ...proceso, [field]: value } : proceso
      ),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setSubmitting(true);

    try {
      await addProducto({
        nombre: formData.nombre,
        precio: parseInt(formData.precio, 10),
        cantidad: parseInt(formData.cantidad, 10),
        variedad: formData.variedad,
        tipoGrano: formData.tipoGrano,
        tueste: formData.tueste,
        foto: formData.foto,
        descripcion: formData.descripcion,
        ubicacionGPS:
          fincas.find((finca) => String(finca.id) === String(formData.fincaId))
            ?.ubicacion || sellerProfile.ubicacion,
        productor: {
          nombre: sellerProfile.marca,
          ubicacion: sellerProfile.ubicacion,
          telefono: sellerProfile.telefono,
          finca:
            fincas.find((finca) => String(finca.id) === String(formData.fincaId))
              ?.nombre || 'Finca sin nombre',
          historia: sellerProfile.historia,
          experiencia: sellerProfile.experiencia,
          especialidad: 'Venta directa y procesos visibles',
        },
        fincaId: formData.fincaId,
        procesos: formData.procesos.filter(
          (proceso) => proceso.obligatorio || proceso.descripcion || proceso.resultado
        ),
      });

      setSubmitted(true);
      setTimeout(() => setCurrentPage('mis-productos'), 1200);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <section className="surface-card">
        <h2 className="font-display text-3xl text-soil-900">Necesitas iniciar sesion</h2>
        <p className="mt-3 text-sm leading-7 text-soil-600">
          Primero entra con tu cuenta y despues completa tu perfil productor para publicar lotes.
        </p>
        <div className="mt-6 flex gap-3">
          <button type="button" className="btn-primary" onClick={() => openAuth('login')}>
            Ingresar
          </button>
          <button type="button" className="btn-ghost" onClick={() => openAuth('register')}>
            Crear cuenta
          </button>
        </div>
      </section>
    );
  };

  if (submitted) {
    return (
      <section className="surface-card text-center">
        <h2 className="font-display text-4xl text-soil-900">Publicacion lista</h2>
        <p className="mt-4 text-sm leading-7 text-soil-600">
          Tu lote ya hace parte del catalogo y conserva la informacion del proceso.
        </p>
      </section>
    );
  }

  if (!sellerProfile?.activeSeller) {
    return (
      <section className="surface-card">
        <h2 className="font-display text-3xl text-soil-900">Completa primero tu perfil vendedor</h2>
        <p className="mt-3 text-sm leading-7 text-soil-600">
          Antes de publicar, necesitamos tu perfil productor activo y al menos una finca registrada.
        </p>
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={() => setCurrentPage('activar-productor')} className="btn-primary">
            Completar perfil
          </button>
        </div>
      </section>
    );
  }

  if (fincas.length === 0) {
    return (
      <section className="surface-card">
        <h2 className="font-display text-3xl text-soil-900">Registra una finca antes de publicar</h2>
        <p className="mt-3 text-sm leading-7 text-soil-600">
          Cada lote debe quedar asociado a una finca concreta para que el origen del cafe sea claro.
        </p>
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={() => setCurrentPage('mis-fincas')} className="btn-primary">
            Gestionar fincas
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <button type="button" onClick={() => setCurrentPage('mis-productos')} className="btn-ghost">
        Volver a mis lotes
      </button>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="surface-card space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
              Nueva publicacion
            </p>
            <h1 className="mt-3 font-display text-4xl text-soil-900">
              Muestra tu cafe con una ficha mas completa
            </h1>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-soil-700">
                Nombre del lote
              </label>
              <input className="field" name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-soil-700">
                Variedad
              </label>
              <select className="field" name="variedad" value={formData.variedad} onChange={handleChange}>
                <option>Arabica</option>
                <option>Geisha</option>
                <option>Bourbon</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-soil-700">
                Finca asociada
              </label>
              <select className="field" name="fincaId" value={formData.fincaId} onChange={handleChange} required>
                {fincas.map((finca) => (
                  <option key={finca.id} value={finca.id}>
                    {finca.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-soil-700">
                Tipo de grano
              </label>
              <input className="field" name="tipoGrano" value={formData.tipoGrano} onChange={handleChange} placeholder="Pergamino lavado" required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-soil-700">
                Precio por kg
              </label>
              <input className="field" type="number" name="precio" value={formData.precio} onChange={handleChange} required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-soil-700">
                Cantidad disponible
              </label>
              <input className="field" type="number" name="cantidad" value={formData.cantidad} onChange={handleChange} required />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-soil-700">
                Perfil de tueste
              </label>
              <select className="field" name="tueste" value={formData.tueste} onChange={handleChange}>
                <option>Claro</option>
                <option>Medio</option>
                <option>Medio oscuro</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-soil-700">
                URL de imagen
              </label>
              <input className="field" name="foto" value={formData.foto} onChange={handleChange} />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-soil-700">
                Descripcion
              </label>
              <textarea
                className="field min-h-[130px]"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Cuenta como sabe, para quien es y por que este cafe tiene valor."
                required
              />
            </div>
          </div>

          {submitError && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-soil-500">
                Proceso del cafe
              </p>
              <p className="mt-2 text-sm leading-7 text-soil-600">
                Los cuatro primeros son obligatorios. El resto sirve para enriquecer la historia del lote.
              </p>
            </div>
            {formData.procesos.map((proceso, index) => (
              <div key={proceso.etapa} className="rounded-2xl border border-soil-100 bg-soil-50 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-soil-900">{proceso.etapa}</h3>
                  {proceso.obligatorio && (
                    <span className="rounded-full bg-sky-100 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-sky-800">
                      Obligatorio
                    </span>
                  )}
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <input
                    className="field"
                    value={proceso.resultado}
                    onChange={(event) => updateProceso(index, 'resultado', event.target.value)}
                    placeholder="Resultado del proceso"
                  />
                  <textarea
                    className="field min-h-[110px] md:col-span-2"
                    value={proceso.descripcion}
                    onChange={(event) => updateProceso(index, 'descripcion', event.target.value)}
                    placeholder="Describe este proceso de forma clara y breve"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Publicando...' : 'Publicar lote'}
            </button>
            <button type="button" onClick={() => setCurrentPage('mis-productos')} className="btn-ghost">
              Cancelar
            </button>
          </div>
        </form>

        <aside className="space-y-6">
          <div className="surface-card">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Vista previa
            </p>
            <img
              src={formData.foto}
              alt="Vista previa del lote"
              className="mt-4 h-64 w-full rounded-[1.5rem] object-cover"
            />
            <h2 className="mt-5 font-display text-3xl text-soil-900">
              {formData.nombre || 'Nombre del lote'}
            </h2>
            <p className="mt-2 text-sm leading-7 text-soil-600">
              {formData.descripcion || 'Aqui aparecera la descripcion del cafe.'}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-soil-50 p-3">
                <p className="text-xs uppercase tracking-[0.16em] text-soil-500">Precio</p>
                <p className="mt-2 font-semibold text-soil-900">
                  ${formData.precio || '0'}
                </p>
              </div>
              <div className="rounded-2xl bg-leaf-50 p-3">
                <p className="text-xs uppercase tracking-[0.16em] text-leaf-700">Cantidad</p>
                <p className="mt-2 font-semibold text-soil-900">
                  {formData.cantidad || '0'} kg
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
