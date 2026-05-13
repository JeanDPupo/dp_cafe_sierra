const defaultProcesses = [
  {
    etapa: 'Siembra',
    obligatorio: true,
    resultado: 'Cafe variedad Arabica',
    descripcion:
      'Seleccion de semilla, preparacion del lote y siembra en condiciones de altura y sombra.',
  },
  {
    etapa: 'Cultivo',
    obligatorio: true,
    resultado: 'Planta fortalecida',
    descripcion:
      'Manejo del cultivo con cuidado del suelo, seguimiento del clima y control manual.',
  },
  {
    etapa: 'Cosecha',
    obligatorio: true,
    resultado: 'Cereza madura',
    descripcion:
      'Recoleccion manual de frutos en su punto ideal para mantener calidad uniforme.',
  },
  {
    etapa: 'Lavado y secado',
    obligatorio: true,
    resultado: 'Grano pergamino',
    descripcion:
      'Lavado del grano y secado controlado para lograr limpieza, estabilidad y mejor taza.',
  },
];

export const mockProducts = [
  {
    id: 1,
    nombre: 'Cafe Arabica Sierra Nevada',
    precio: 25000,
    cantidad: 10,
    variedad: 'Arabica',
    tipoGrano: 'Pergamino lavado',
    tueste: 'Medio',
    foto:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b8d5?w=900&h=700&fit=crop',
    descripcion:
      'Cafe de perfil dulce y limpio, cultivado en Sacramento con practicas familiares y enfoque en trazabilidad.',
    ubicacionGPS: 'Sacramento, Fundacion, Magdalena',
    productor: {
      nombre: 'J-Cafe',
      ubicacion: 'Corregimiento de Sacramento, Fundacion',
      telefono: '+57 3001234567',
      finca: 'Los Limos de la Fe',
      historia:
        'Proyecto familiar que busca conectar el origen del cafe con consumidores que valoran el campo.',
      experiencia: '15 anos cultivando cafe',
      especialidad: 'Microlotes y cafe tostado para venta directa',
    },
    procesos: defaultProcesses,
  },
  {
    id: 2,
    nombre: 'Geisha de altura El Amanecer',
    precio: 35000,
    cantidad: 5,
    variedad: 'Geisha',
    tipoGrano: 'Lavado especial',
    tueste: 'Claro',
    foto:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=900&h=700&fit=crop',
    descripcion:
      'Lote especial con notas florales y cuerpo ligero, pensado para quienes disfrutan una taza mas delicada.',
    ubicacionGPS: 'Sierra Nevada, Fundacion',
    productor: {
      nombre: 'Finca El Amanecer',
      ubicacion: 'Sierra Nevada, Fundacion',
      telefono: '+57 3009876543',
      finca: 'El Amanecer',
      historia:
        'Una finca de montana enfocada en lotes pequenos y procesos cuidadosos.',
      experiencia: '12 anos de produccion',
      especialidad: 'Variedades especiales de altura',
    },
    procesos: defaultProcesses,
  },
  {
    id: 3,
    nombre: 'Bourbon microlote Sacramento',
    precio: 30000,
    cantidad: 8,
    variedad: 'Bourbon',
    tipoGrano: 'Natural controlado',
    tueste: 'Medio',
    foto:
      'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=900&h=700&fit=crop',
    descripcion:
      'Microlote frutal con acidez amable, ideal para filtrados y consumidores que buscan historia en cada compra.',
    ubicacionGPS: 'Sacramento, Fundacion, Magdalena',
    productor: {
      nombre: 'Cafes Artesanales Sacramento',
      ubicacion: 'Sacramento, Fundacion',
      telefono: '+57 3005551234',
      finca: 'Microlote Premium',
      historia:
        'Productores que trabajan lotes pequenos con identidad territorial y venta directa.',
      experiencia: '10 anos de practica cafetera',
      especialidad: 'Fermentaciones y lotes artesanales',
    },
    procesos: defaultProcesses,
  },
];

export const mockSellerProfile = {
  nombre: 'Jheymer Jhireth Navarro',
  marca: 'J-Cafe',
  telefono: '+57 3001234567',
  ubicacion: 'Corregimiento de Sacramento, Fundacion',
  experiencia: '15 anos cultivando cafe',
  historia:
    'Somos una familia cafetera que quiere vender con transparencia, mostrar el proceso y acercar el campo a la mesa.',
  activeSeller: false,
  fincas: [
    {
      id: 1,
      nombre: 'Los Limos de la Fe',
      ubicacion: 'Sacramento, Fundacion',
      gps: '10.3910,-73.5475',
      descripcion: 'Finca principal para lotes de altura.',
    },
  ],
};

export const producerHighlights = [
  'Publica tus lotes con proceso, variedad y disponibilidad.',
  'Muestra la historia de tu finca para generar confianza.',
  'Conecta por WhatsApp con compradores sin intermediarios.',
];
