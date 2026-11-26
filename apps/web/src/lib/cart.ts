export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  nameBn?: string;
  price: number;
  quantity: number;
  image?: string;
  giftWrap?: boolean;
  giftMessage?: string;
}

const CART_STORAGE_KEY = 'meghpiyon_cart';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('meghpiyon-cart-updated', { detail: items }));
  } catch (err) {
    console.warn('Could not save cart to localStorage', err);
  }
}

export function addToCart(newItem: CartItem): CartItem[] {
  const items = getCart();
  const existing = items.find((item) => item.productId === newItem.productId);
  if (existing) {
    existing.quantity += newItem.quantity || 1;
    if (newItem.giftMessage) {
      existing.giftMessage = newItem.giftMessage;
    }
  } else {
    items.push({
      ...newItem,
      quantity: newItem.quantity || 1,
      giftWrap: newItem.giftWrap ?? true,
    });
  }
  saveCart(items);
  return items;
}

export function updateCartQuantity(productId: string, delta: number): CartItem[] {
  const items = getCart()
    .map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    )
    .filter((item) => item.quantity > 0);
  saveCart(items);
  return items;
}

export function removeFromCart(productId: string): CartItem[] {
  const items = getCart().filter((item) => item.productId !== productId);
  saveCart(items);
  return items;
}

export function clearCart(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('meghpiyon-cart-updated', { detail: [] }));
}
