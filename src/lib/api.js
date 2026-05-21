const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8080').replace(/\/$/, '');

function buildUrl(path, query = {}) {
  const url = new URL(`${API_URL}${path}`);
  Object.entries(query).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

async function request(path, options = {}) {
  const { method = 'GET', token, body, query, headers = {} } = options;
  const response = await fetch(buildUrl(path, query), {
    method,
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === 'object' && data?.message
        ? data.message
        : `La solicitud fallo con estado ${response.status}.`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data;
}

export const api = {
  health: () => request('/api/v1/health'),
  register: (payload) =>
    request('/api/v1/auth/register', { method: 'POST', body: payload }),
  login: (payload) =>
    request('/api/v1/auth/login', { method: 'POST', body: payload }),
  me: (token) => request('/api/v1/auth/me', { token }),
  getProducts: (filters = {}) =>
    request('/api/v1/products', { query: filters }),
  getProduct: (productId) => request(`/api/v1/products/${productId}`),
  getProducer: (producerProfileId) => request(`/api/v1/producers/${producerProfileId}`),
  getMyProducerProfile: (token) =>
    request('/api/v1/users/me/producer-profile', { token }),
  upsertMyProducerProfile: (token, payload) =>
    request('/api/v1/users/me/producer-profile', {
      method: 'POST',
      token,
      body: payload,
    }),
  getMyFarms: (token) => request('/api/v1/users/me/farms', { token }),
  createFarm: (token, payload) =>
    request('/api/v1/users/me/farms', { method: 'POST', token, body: payload }),
  getMyProducts: (token) => request('/api/v1/users/me/products', { token }),
  createProduct: (token, payload) =>
    request('/api/v1/products', { method: 'POST', token, body: payload }),
  deleteProduct: (token, productId) =>
    request(`/api/v1/products/${productId}`, { method: 'DELETE', token }),
};

export { API_URL };
