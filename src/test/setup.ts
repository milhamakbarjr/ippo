import '@testing-library/jest-dom/vitest';
import { beforeEach } from 'vitest';

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

const localStorageMock = createStorageMock();
const sessionStorageMock = createStorageMock();

Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
  configurable: true,
});

Object.defineProperty(globalThis, 'sessionStorage', {
  value: sessionStorageMock,
  writable: true,
  configurable: true,
});

// Clear both storages before every test to prevent cross-test and cross-file bleed
beforeEach(() => {
  localStorageMock.clear();
  sessionStorageMock.clear();
});
