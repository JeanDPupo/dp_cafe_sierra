const REQUIRED_STAGES = new Set(['SIEMBRA', 'CULTIVO', 'COSECHA', 'LAVADO_SECADO']);

const STAGE_LABELS = {
  SIEMBRA: 'Siembra',
  CULTIVO: 'Cultivo',
  COSECHA: 'Cosecha',
  LAVADO_SECADO: 'Lavado y secado',
  TOSTADO: 'Tostado',
  MOLIDO: 'Molido',
  EMPAQUE: 'Empaque',
  DISTRIBUCION: 'Distribucion',
};

const STAGE_TO_API = {
  Siembra: 'SIEMBRA',
  Cultivo: 'CULTIVO',
  Cosecha: 'COSECHA',
  'Lavado y secado': 'LAVADO_SECADO',
  Tostado: 'TOSTADO',
  Molido: 'MOLIDO',
  Empaque: 'EMPAQUE',
  Distribucion: 'DISTRIBUCION',
};

function normalizePhone(value) {
  return value || '';
}

export function stageLabel(stage) {
  return STAGE_LABELS[stage] || stage;
}

export function stageToApi(stage) {
  return STAGE_TO_API[stage] || stage;
}

export function mapCatalogProduct(item) {
  return {
    id: item.id,
    producerProfileId: item.producerProfileId,
    farmId: item.farmId,
    farmName: item.farmName,
    nombre: item.name,
    variedad: item.variety,
    precio: Number(item.pricePerKg),
    cantidad: Number(item.availableKg),
    descripcion: item.description,
    foto: item.mainImageUrl || 'https://images.unsplash.com/photo-1559056199-641a0ac8b8d5?w=900&h=700&fit=crop',
    ubicacionGPS: item.producerLocation,
    estado: item.status,
    createdAt: item.createdAt,
    productor: {
      nombre: item.producerBrandName,
      ubicacion: item.producerLocation,
      telefono: '',
      finca: item.farmName,
      historia: '',
      experiencia: '',
      especialidad: 'Venta directa y trazabilidad',
    },
    procesos: [],
    promedioCalificacion: 0,
    totalComentarios: 0,
  };
}

export function mapProductDetail(item) {
  return {
    id: item.id,
    producerProfileId: item.producer.id,
    farmId: item.farmId,
    farmName: item.farmName,
    nombre: item.name,
    variedad: item.variety,
    precio: Number(item.pricePerKg),
    cantidad: Number(item.availableKg),
    descripcion: item.description,
    foto: item.mainImageUrl || 'https://images.unsplash.com/photo-1559056199-641a0ac8b8d5?w=900&h=700&fit=crop',
    ubicacionGPS: item.producer.locationText,
    estado: item.status,
    createdAt: item.createdAt,
    promedioCalificacion: item.averageRating || 0,
    totalComentarios: item.commentCount || 0,
    productor: {
      nombre: item.producer.brandName,
      ubicacion: item.producer.locationText,
      telefono: normalizePhone(item.producer.whatsappNumber || item.producer.phone),
      finca: item.farmName,
      historia: item.producer.story || item.producer.bio || '',
      experiencia: item.producer.yearsExperience || 'Experiencia no registrada',
      especialidad: 'Venta directa y trazabilidad',
    },
    procesos: (item.processes || []).map((process) => ({
      id: process.id,
      etapa: stageLabel(process.stage),
      obligatorio: REQUIRED_STAGES.has(process.stage),
      resultado: process.resultType,
      descripcion: process.description,
      media: process.media || [],
    })),
  };
}

export function mapProducerProfile(profile) {
  return {
    id: profile.id,
    userId: profile.userId,
    ownerName: profile.ownerName,
    phone: profile.phone || '',
    whatsappNumber: profile.whatsappNumber || '',
    activeSeller: profile.activeSeller,
    brandName: profile.brandName,
    bio: profile.bio || '',
    story: profile.story || '',
    locationText: profile.locationText,
    gps: profile.gps || '',
    yearsExperience: profile.yearsExperience || '',
    coverImageUrl: profile.coverImageUrl || '',
    farms: (profile.farms || []).map((farm) => ({
      id: farm.id,
      nombre: farm.name,
      ubicacion: farm.locationText,
      gps: farm.gps || '',
      descripcion: farm.description || '',
      active: farm.active,
    })),
    products: (profile.products || []).map(mapCatalogProduct),
  };
}

export function mapSellerProfile(profile) {
  const normalized = mapProducerProfile(profile);
  return {
    id: normalized.id,
    producerProfileId: normalized.id,
    nombre: normalized.ownerName,
    marca: normalized.brandName,
    telefono: normalized.whatsappNumber || normalized.phone,
    ubicacion: normalized.locationText,
    experiencia: normalized.yearsExperience,
    historia: normalized.story,
    bio: normalized.bio,
    activeSeller: normalized.activeSeller,
    fincas: normalized.farms,
    coverImageUrl: normalized.coverImageUrl,
  };
}
