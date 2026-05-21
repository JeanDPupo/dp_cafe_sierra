import React from 'react';

export const BotonWhatsApp = ({ telefono, productName }) => {
  const phoneNumber = (telefono || '').replace(/\D/g, '');

  const handleWhatsApp = () => {
    if (!phoneNumber) {
      return;
    }
    const message = `Hola, me interesa ${productName}. Quisiera conocer mas sobre este cafe y su disponibilidad.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleWhatsApp}
      disabled={!phoneNumber}
      className="btn-secondary w-full"
    >
      {phoneNumber ? 'Contactar por WhatsApp' : 'Contacto no disponible aun'}
    </button>
  );
};
