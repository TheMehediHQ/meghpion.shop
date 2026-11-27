/**
 * Resolves the full base URL for the API across server runtimes
 * (using Vercel service binding API_URL) and client runtimes (browser relative path or dev host).
 */
export function getApiBaseUrl(): string {
  const stripTrailingSlash = (url: string) => url.replace(/\/+$/, '');

  // 1. Server-side runtime (SSR / Vercel Functions / prerender / SSG build)
  if (typeof window === 'undefined') {
    // Vercel "services" binding: full service URL, so append the API prefix.
    const serviceBindingUrl = typeof process !== 'undefined' ? process.env?.API_URL : undefined;
    if (serviceBindingUrl) {
      return `${stripTrailingSlash(serviceBindingUrl)}/api/v1`;
    }
    // PUBLIC_API_URL, when provided, is expected to already include the /api/v1 prefix.
    if (import.meta.env.PUBLIC_API_URL) {
      return stripTrailingSlash(import.meta.env.PUBLIC_API_URL);
    }
    // Production builds MUST NOT fall back to a local dev server (127.0.0.1:5000),
    // otherwise Astro SSG builds on Vercel fail/hang with ECONNREFUSED. Instead,
    // route /api/v1 through the same origin via Vercel rewrites.
    const isProd =
      import.meta.env.PROD === true ||
      import.meta.env.MODE === 'production' ||
      (typeof process !== 'undefined' && process.env.NODE_ENV === 'production');
    if (isProd) {
      return '/api/v1';
    }
    return 'http://localhost:5000/api/v1';
  }

  // 2. Client-side runtime (Browser)
  if (import.meta.env.PUBLIC_API_URL) {
    return stripTrailingSlash(import.meta.env.PUBLIC_API_URL);
  }

  // When developing locally with separate frontend/backend ports and no PUBLIC_API_URL set
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000/api/v1';
  }

  // In production on Vercel, requests to /api/v1 are routed to the api service via rewrites
  return '/api/v1';
}

export function getApiUrl(endpoint: string): URL {
  const base = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  if (base.startsWith('http://') || base.startsWith('https://')) {
    return new URL(`${base}${cleanEndpoint}`);
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  return new URL(`${base}${cleanEndpoint}`, origin);
}

function hasServerApiOrigin(): boolean {
  if (typeof window !== 'undefined') return true;
  const base = getApiBaseUrl();
  return base.startsWith('http://') || base.startsWith('https://');
}

export async function fetchProducts(category?: string, showAll: boolean = false) {
  if (!hasServerApiOrigin()) {
    return [];
  }
  try {
    const url = getApiUrl('/products');
    if (category && category !== 'all') {
      url.searchParams.set('category', category);
    }
    if (showAll) {
      url.searchParams.set('showAll', 'true');
    }
    url.searchParams.set('limit', '100');
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data?.items || [];
  } catch (error) {
    console.warn('API fetchProducts failed, returning empty or fallback:', error);
    return [];
  }
}

export async function fetchProductBySlug(slug: string) {
  if (!hasServerApiOrigin()) {
    return null;
  }
  try {
    const url = getApiUrl(`/products/${slug}`);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.warn('API fetchProductBySlug failed:', error);
    return null;
  }
}

export function getStoredAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return (
    localStorage.getItem('meghpiyon_admin_token') ||
    localStorage.getItem('meghpiyon_auth_token')
  );
}

function getAuthHeaders(includeContentType: boolean = true): Record<string, string> {
  const headers: Record<string, string> = {};
  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getStoredAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function loginApi(emailOrPhone: string, password: string) {
  const url = getApiUrl('/auth/login');
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emailOrPhone, password }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || json?.message || `Login failed (${res.status})`);
  }
  return json.data;
}

export async function registerApi(payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}) {
  const url = getApiUrl('/auth/register');
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || json?.message || `Registration failed (${res.status})`);
  }
  return json.data;
}

export async function fetchStaffApi() {
  const url = getApiUrl('/auth/staff');
  const res = await fetch(url.toString(), {
    headers: getAuthHeaders(false),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || json?.message || `Failed to load staff (${res.status})`);
  }
  return json.data || [];
}

export async function createStaffApi(payload: {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'employee' | 'moderator' | 'admin';
}) {
  const url = getApiUrl('/auth/staff');
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || json?.message || `Failed to create staff (${res.status})`);
  }
  return json.data;
}

export async function deleteStaffApi(id: string) {
  const url = getApiUrl(`/auth/staff/${id}`);
  const res = await fetch(url.toString(), {
    method: 'DELETE',
    headers: getAuthHeaders(false),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || json?.message || `Failed to remove staff (${res.status})`);
  }
  return json.data;
}

export async function changePasswordApi(currentPassword: string, newPassword: string) {
  const url = getApiUrl('/auth/change-password');
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: getAuthHeaders(true),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || json?.message || `Failed to change password (${res.status})`);
  }
  return json.data;
}

export async function resetStaffPasswordApi(id: string, newPassword: string) {
  const url = getApiUrl(`/auth/staff/${id}/password`);
  const res = await fetch(url.toString(), {
    method: 'PATCH',
    headers: getAuthHeaders(true),
    body: JSON.stringify({ newPassword }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(json?.error?.message || json?.message || `Failed to reset staff password (${res.status})`);
  }
  return json.data;
}

export async function createProductApi(productPayload: any) {
  try {
    const url = getApiUrl('/products');
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: getAuthHeaders(true),
      body: JSON.stringify(productPayload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || err.message || `Failed to create product: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Create product API error:', error);
    throw error;
  }
}

export async function updateProductApi(id: string, productPayload: any) {
  try {
    const url = getApiUrl(`/products/${id}`);
    const res = await fetch(url.toString(), {
      method: 'PUT',
      headers: getAuthHeaders(true),
      body: JSON.stringify(productPayload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || err.message || `Failed to update product: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Update product API error:', error);
    throw error;
  }
}

export async function deleteProductApi(id: string) {
  try {
    const url = getApiUrl(`/products/${id}`);
    const res = await fetch(url.toString(), {
      method: 'DELETE',
      headers: getAuthHeaders(false),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || err.message || `Failed to delete product: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Delete product API error:', error);
    throw error;
  }
}

export async function submitOrder(orderPayload: any) {
  try {
    const url = getApiUrl('/orders');
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      const details = errData?.error?.details;
      const detailMsg = Array.isArray(details)
        ? details.map((d: any) => d.message || d.field).filter(Boolean).join(', ')
        : '';
      const baseMsg = errData?.error?.message || errData.message || `Order creation failed: ${res.status}`;
      throw new Error(detailMsg ? `${baseMsg} (${detailMsg})` : baseMsg);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Submit order error:', error);
    throw error;
  }
}

export async function trackOrderApi(orderNumber: string) {
  try {
    const url = getApiUrl(`/orders/${orderNumber}`);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Order not found or error: ${res.status}`);
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.warn('Track order API error:', error);
    return null;
  }
}

export async function fetchOrdersApi() {
  try {
    const url = getApiUrl('/orders');
    const res = await fetch(url.toString(), {
      headers: getAuthHeaders(false),
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.warn('API fetchOrders failed:', error);
    return [];
  }
}

export async function updateOrderStatusApi(id: string, payload: { orderStatus?: string; paymentStatus?: string; note?: string }) {
  try {
    const url = getApiUrl(`/orders/${id}/status`);
    const res = await fetch(url.toString(), {
      method: 'PATCH',
      headers: getAuthHeaders(true),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || err.message || `Failed to update order: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Update order status API error:', error);
    throw error;
  }
}
