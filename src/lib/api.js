const API_URL = (process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080').replace(/\/$/, '');

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
  getComments: (productId) => request(`/api/v1/products/${productId}/comments`),
  createComment: (token, productId, payload) =>
    request(`/api/v1/products/${productId}/comments`, {
      method: 'POST',
      token,
      body: payload,
    }),
  getCart: (token) => request('/api/v1/cart', { token }),
  addCartItem: (token, payload) =>
    request('/api/v1/cart/items', { method: 'POST', token, body: payload }),
  updateCartItem: (token, cartItemId, payload) =>
    request(`/api/v1/cart/items/${cartItemId}`, { method: 'PATCH', token, body: payload }),
  deleteCartItem: (token, cartItemId) =>
    request(`/api/v1/cart/items/${cartItemId}`, { method: 'DELETE', token }),
  checkout: (token) => request('/api/v1/orders/checkout', { method: 'POST', token }),
  getPurchases: (token) => request('/api/v1/users/me/purchases', { token }),
  getSales: (token) => request('/api/v1/users/me/sales', { token }),
  createPaymentPreference: (token, orderId, provider) =>
    request(`/api/v1/payments/orders/${orderId}/preference`, {
      method: 'POST',
      token,
      body: provider ? { provider } : {},
    }),
  getPayment: (token, paymentId) => request(`/api/v1/payments/${paymentId}`, { token }),
};

export { API_URL };
