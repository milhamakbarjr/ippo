import { vi } from 'vitest';

/**
 * Creates a Proxy-based fluent chain mock for Drizzle ORM's query builder pattern.
 * Each method in the chain returns the proxy itself, and the chain is resolved
 * by calling the final method (which returns a Promise resolving to `returnValue`).
 *
 * Usage:
 *   const mockChain = createDrizzleChain([{ id: '123' }]);
 *   mockDb.select.mockReturnValue(mockChain);
 */
export function createDrizzleChain(returnValue: unknown = []) {
  const handler: ProxyHandler<object> = {
    get(_target, prop) {
      if (prop === 'then') {
        // Make the chain itself a thenable so `await chain` works
        return (resolve: (v: unknown) => void) => resolve(returnValue);
      }
      // Every method returns the proxy so chains can be arbitrarily long
      return () => new Proxy({}, handler);
    },
  };
  return new Proxy({}, handler);
}

/**
 * Creates a mock db object with vi.fn() for all common Drizzle top-level methods.
 * Each method returns a fluent chain that resolves to an empty array by default.
 *
 * Usage:
 *   vi.mock('@/db', () => ({ db: createMockDb() }));
 *   // Then in individual tests:
 *   mockDb.select.mockReturnValue(createDrizzleChain([{ streak: 3 }]));
 */
export function createMockDb() {
  return {
    select:      vi.fn(() => createDrizzleChain([])),
    insert:      vi.fn(() => createDrizzleChain([])),
    update:      vi.fn(() => createDrizzleChain([])),
    delete:      vi.fn(() => createDrizzleChain([])),
    transaction: vi.fn(async (cb: (tx: ReturnType<typeof createMockDb>) => Promise<unknown>) => {
      return cb(createMockDb());
    }),
  };
}
