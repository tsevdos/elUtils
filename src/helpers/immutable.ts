import type { DeepReadonly } from "../types";

// Node 22 provides structuredClone, but this project does not include DOM globals in its TypeScript configuration.
declare function structuredClone<T>(value: T): T;

/**
 * Deeply freezes a library-owned value and its nested data.
 */
export function deepFreeze<T>(value: T): DeepReadonly<T> {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const child of Object.values(value)) {
      deepFreeze(child);
    }
    Object.freeze(value);
  }

  return value as DeepReadonly<T>;
}

/**
 * Creates a frozen snapshot without modifying the source data.
 */
export function immutableSnapshot<T>(value: T): DeepReadonly<T> {
  return deepFreeze(structuredClone(value));
}
