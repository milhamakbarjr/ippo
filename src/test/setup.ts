import '@testing-library/jest-dom/vitest';

// Node.js 22+ ships a partial native localStorage that lacks .clear()
// and shadows jsdom's proper implementation. Replace both with a full mock.
function createStorageMock() {
  let store: Record<string, string> = {};
  return {
    get length() { return Object.keys(store).length; },
    getItem(key: string) { return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null; },
    setItem(key: string, value: string) { store[key] = String(value); },
    removeItem(key: string) { delete store[key]; },
    clear() { store = {}; },
    key(i: number) { return Object.keys(store)[i] ?? null; },
  };
}

Object.defineProperty(globalThis, 'localStorage', {
  value: createStorageMock(),
  writable: true,
  configurable: true,
});

Object.defineProperty(globalThis, 'sessionStorage', {
  value: createStorageMock(),
  writable: true,
  configurable: true,
});
