declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: (...args: unknown[]) => void;
  }
}

export const META_PIXEL_ID = import.meta.env.PUBLIC_META_PIXEL_ID || '';

export function fbTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (params) {
      window.fbq('track', event, params);
    } else {
      window.fbq('track', event);
    }
  }
}

export function trackViewContent(item: {
  content_name: string;
  content_category?: string;
  content_ids?: string[];
  value: number;
  currency?: string;
}) {
  fbTrack('ViewContent', {
    currency: 'BDT',
    ...item,
  });
}

export function trackAddToCart(item: {
  content_name: string;
  content_category?: string;
  content_ids?: string[];
  value: number;
  currency?: string;
}) {
  fbTrack('AddToCart', {
    currency: 'BDT',
    ...item,
  });
}

export function trackInitiateCheckout(data: {
  value: number;
  currency?: string;
  num_items: number;
}) {
  fbTrack('InitiateCheckout', {
    currency: 'BDT',
    ...data,
  });
}

export function trackPurchase(data: {
  value: number;
  currency?: string;
  num_items: number;
  order_id?: string;
}) {
  fbTrack('Purchase', {
    currency: 'BDT',
    ...data,
  });
}
