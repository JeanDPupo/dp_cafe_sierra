import React from 'react';

export const BotonWhatsApp = ({ telefono, productName }) => {
  const phoneNumber = telefono.replace(/\D/g, '');

  const handleWhatsApp = () => {
    const message = `Hola, me interesa ${productName}. Quisiera conocer mas sobre este cafe y su disponibilidad.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleWhatsApp}
      className="btn-secondary w-full"
    >
      Contactar por WhatsApp
    </button>
  );
};
