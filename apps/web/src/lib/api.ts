/**
 * Resolves the full base URL for the API across server runtimes
 * (using Vercel service binding API_URL) and client runtimes (browser relative path or dev host).
 */
export function getApiBaseUrl(): string {
  // 1. Server-side runtime (SSR / Vercel Functions / prerender)
  if (typeof window === 'undefined') {
    const serviceBindingUrl = typeof process !== 'undefined' ? process.env?.API_URL : undefined;
    if (serviceBindingUrl) {
      return `${serviceBindingUrl.replace(/\/$/, '')}/api/v1`;
    }
    return import.meta.env.PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  }

  // 2. Client-side runtime (Browser)
  if (import.meta.env.PUBLIC_API_URL) {
    return import.meta.env.PUBLIC_API_URL;
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

export async function fetchProducts(category?: string, showAll: boolean = false) {
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

export async function createProductApi(productPayload: any) {
  try {
    const url = getApiUrl('/products');
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productPayload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to create product: ${res.status}`);
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productPayload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to update product: ${res.status}`);
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
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to delete product: ${res.status}`);
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
      throw new Error(errData.message || `Order creation failed: ${res.status}`);
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
    const res = await fetch(url.toString());
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to update order: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Update order status API error:', error);
    throw error;
  }
}
