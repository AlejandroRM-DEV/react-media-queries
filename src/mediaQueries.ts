import { useSyncExternalStore } from "react";

/**
 * Interface for a media query store compatible with React's `useSyncExternalStore`.
 * Manages subscriptions and provides snapshots of media query match states.
 */
interface MediaQueryStore {
	subscribe: (listener: () => void) => () => void;
	getSnapshot: () => boolean;
}

/**
 * Global map storing one media query store per unique query string.
 * Ensures a single `matchMedia` listener per query, shared across components for efficiency.
 */
const mediaQueryStores = new Map<string, MediaQueryStore>();

/**
 * Creates or retrieves a store for the given media query, compatible with `useSyncExternalStore`.
 * Reuses stores for identical queries and handles SSR. Manages subscriptions and cleanup.
 *
 * @param query - The CSS media query string to monitor (e.g., "(min-width: 768px)")
 * @returns A MediaQueryStore instance for the query
 */
function getOrCreateMediaQueryStore(query: string): MediaQueryStore {
	if (mediaQueryStores.has(query)) return mediaQueryStores.get(query)!;

	let mql: MediaQueryList | null = null;

	const listeners = new Set<() => void>();

	const initMql = () => {
		if (
			typeof window !== "undefined" &&
			typeof window.matchMedia === "function"
		) {
			if (!mql) mql = window.matchMedia(query);
		}
	};

	/**
	 * Returns the current state of the media query ("snapshot").
	 * Used by React during render to ensure consistent values.
	 *
	 * @returns {boolean} - Whether the media query matches
	 */
	const getSnapshot = () => {
		initMql();
		return mql?.matches ?? false;
	};

	/**
	 * Handler called when the matchMedia state changes.
	 * Notifies all subscribers.
	 */
	const handleChange = () => {
		listeners.forEach((listener) => listener());
	};

	/**
	 * Register a subscriber function that will be called on media query changes.
	 *
	 * @param listener - The callback to execute when the query state changes.
	 * @returns Unsubscribe function
	 */
	const subscribe = (listener: () => void) => {
		listeners.add(listener);

		if (listeners.size === 1) {
			if (
				typeof window !== "undefined" &&
				typeof window.matchMedia === "function"
			) {
				initMql();
				if (mql) {
					mql.addEventListener("change", handleChange);
				}
			}
		}

		return () => {
			listeners.delete(listener);
			if (listeners.size === 0 && mql) {
				mql.removeEventListener("change", handleChange);
				mql = null;
				mediaQueryStores.delete(query);
			}
		};
	};

	const store = { subscribe, getSnapshot };
	mediaQueryStores.set(query, store);
	return store;
}

/**
 * React hook that evaluates a single CSS media query and returns its match state.
 * Uses `useSyncExternalStore` for performance and SSR compatibility.
 *
 * @param query - The CSS media query string to evaluate (e.g., "(min-width: 768px)")
 * @returns `true` if the query matches, `false` otherwise. Returns `false` in SSR.
 */
export function useMediaQuery(query: string): boolean {
	const store = getOrCreateMediaQueryStore(query);
	return useSyncExternalStore(store.subscribe, store.getSnapshot, () => false);
}
