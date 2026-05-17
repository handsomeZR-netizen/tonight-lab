"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Updater<T> = T | ((prev: T) => T);

/**
 * SSR-safe localStorage-backed state.
 *
 * - Reads from localStorage once on mount (after hydration) to avoid SSR
 *   hydration mismatches.
 * - Writes back to localStorage whenever the value changes.
 * - Subscribes to cross-tab `storage` events so multiple tabs stay in sync.
 * - JSON-encodes the value; parse errors are logged and the initial value
 *   is used instead.
 * - The `key` argument is used as-is (no namespace prefix is added). The
 *   caller is responsible for picking a unique key.
 */
export function useLocalStorageState<T>(
  key: string,
  initial: T,
): [T, (next: Updater<T>) => void] {
  const [value, setValue] = useState<T>(initial);
  const initialRef = useRef(initial);
  initialRef.current = initial;
  // Tracks whether we've already hydrated from localStorage. We only want
  // to persist writes after the first read so we don't overwrite stored
  // state with the initial value before we got a chance to read it.
  const hydratedRef = useRef(false);

  // One-time hydrate from localStorage. We intentionally do this in an
  // effect (not in useState's initializer) so the server-rendered HTML and
  // the initial client render agree before the value is replaced.
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        setValue(JSON.parse(raw) as T);
      }
    } catch (error) {
      console.warn(
        `useLocalStorageState: failed to parse value for key "${key}"`,
        error,
      );
    } finally {
      hydratedRef.current = true;
    }
  }, [key]);

  // Persist on change (after hydration).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hydratedRef.current) return;

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(
        `useLocalStorageState: failed to persist value for key "${key}"`,
        error,
      );
    }
  }, [key, value]);

  // Cross-tab sync.
  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleStorage(event: StorageEvent) {
      if (event.key !== key) return;
      if (event.storageArea !== window.localStorage) return;

      if (event.newValue === null) {
        setValue(initialRef.current);
        return;
      }

      try {
        setValue(JSON.parse(event.newValue) as T);
      } catch (error) {
        console.warn(
          `useLocalStorageState: failed to parse cross-tab value for key "${key}"`,
          error,
        );
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [key]);

  const update = useCallback((next: Updater<T>) => {
    setValue((prev) =>
      typeof next === "function" ? (next as (prev: T) => T)(prev) : next,
    );
  }, []);

  return [value, update];
}
