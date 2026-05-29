import React, { useContext, useState } from 'react';
import { RoleContext } from '../context/RoleContext';
import logo from '../logo.svg';

const steps = [
  {
    id: 'catalog',
    title: 'Explora el catalogo',
    description: 'Descubre cafes de productores en Sacramento con informacion de origen visible: finca, variedad y proceso de produccion.',
    icon: (
      <svg className="h-8 w-8 text-leaf-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    id: 'direct',
    title: 'Contacto directo',
    description: 'Comunicate con el productor por WhatsApp para cerrar la compra de forma natural, sin intermediarios ni comisiones ocultas.',
    icon: (
      <svg className="h-8 w-8 text-leaf-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    id: 'publish',
    title: 'Publica tus lotes',
    description: 'Como productor, crea tu perfil, registra tus fincas y publica lotes con toda la informacion que genera confianza en el comprador.',
    icon: (
      <svg className="h-8 w-8 text-leaf-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'pwa',
    title: 'Instalable en tu dispositivo',
    description: 'La plataforma funciona como una aplicacion instalable (PWA). Guardala en tu pantalla de inicio y accede rapidamente, incluso sin conexion.',
    icon: (
      <svg className="h-8 w-8 text-leaf-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

export const OnboardingPage = () => {
  const { setCurrentPage, setRoleExplicit } = useContext(RoleContext);
  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      setCurrentPage('home');
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleSkip = () => {
    setCurrentPage('home');
  };

  return (
    <section className="flex items-center justify-center px-4 py-8">
      <div className="surface-card w-full max-w-lg text-center">
        <img src={logo} alt="CafeDirecto Sacramento" className="mx-auto h-14 w-14 rounded-2xl shadow-soft" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-700">
          Paso {currentStep + 1} de {steps.length}
        </p>

        <div className="mt-6 flex justify-center">
          {step.icon}
        </div>

        <h2 className="mt-5 font-display text-2xl text-soil-900">
          {step.title}
        </h2>

        <p className="mt-4 text-sm leading-7 text-soil-600 max-w-md mx-auto">
          {step.description}
        </p>

        <div className="mt-8 flex items-center justify-center gap-2">
          {steps.map((_, idx) => (
            <span
              key={idx}
              className={`block h-2 w-2 rounded-full ${
                idx === currentStep ? 'bg-leaf-600' : 'bg-soil-200'
              }`}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={handleNext} className="btn-primary">
            {isLast ? 'Comenzar' : 'Siguiente'}
          </button>
          <button type="button" onClick={handleSkip} className="btn-ghost">
            Saltar introduccion
          </button>
        </div>

        {isLast && (
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button type="button" onClick={() => { setRoleExplicit('consumidor'); setCurrentPage('catalogo'); }} className="btn-primary">
              Ir al catalogo
            </button>
            <button type="button" onClick={() => { setRoleExplicit('productor'); setCurrentPage('publicar'); }} className="btn-secondary">
              Quiero vender
            </button>
          </div>
        )}

        {!isLast && (
          <p className="mt-8 text-xs text-soil-400">
            Podes completar el recorrido o{' '}
            <button type="button" onClick={handleSkip} className="underline hover:text-soil-600">
              saltar al inicio
            </button>
            .
          </p>
        )}
      </div>
    </section>
  );
};

export default OnboardingPage;
