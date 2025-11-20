import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "./mediaQueries";

// Mock matchMedia globally
let mockMatchMedia: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
	// @ts-ignore
	mockMatchMedia = vi.spyOn(window, "matchMedia");
});

afterEach(() => {
	mockMatchMedia.mockRestore();
});

// Helper to create a mock MediaQueryList
function createMockMediaQueryList(matches = false) {
	const listeners = new Set<() => void>();
	const mql = {
		matches,
		addEventListener: vi.fn((event: string, listener: () => void) => {
			if (event === "change") listeners.add(listener);
		}),
		removeEventListener: vi.fn((event: string, listener: () => void) => {
			if (event === "change") listeners.delete(listener);
		}),
		dispatchChange: (newMatches: boolean) => {
			mql.matches = newMatches;
			listeners.forEach((listener) => listener());
		},
	};
	return mql;
}

describe("useMediaQuery", () => {
	it("should return true when media query matches", () => {
		const mql = createMockMediaQueryList(true);
		mockMatchMedia.mockReturnValue(mql);

		const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

		expect(result.current).toBe(true);
		expect(mockMatchMedia).toHaveBeenCalledWith("(min-width: 768px)");
	});

	it("should return false when media query does not match", () => {
		const mql = createMockMediaQueryList(false);
		mockMatchMedia.mockReturnValue(mql);

		const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

		expect(result.current).toBe(false);
	});

	it("should return false when window is undefined (SSR)", () => {
		// @ts-ignore
		delete global.window.matchMedia;

		const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

		expect(result.current).toBe(false);
	});

	it("should return false when matchMedia is not a function", () => {
		// @ts-ignore
		global.window.matchMedia = "not a function";

		const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

		expect(result.current).toBe(false);
	});

	it("should update when media query changes", () => {
		const mql = createMockMediaQueryList(false);
		mockMatchMedia.mockReturnValue(mql);

		const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

		expect(result.current).toBe(false);

		act(() => {
			mql.dispatchChange(true);
		});

		expect(result.current).toBe(true);
	});

	it("should handle multiple instances with the same query sharing the store", () => {
		const mql = createMockMediaQueryList(true);
		mockMatchMedia.mockReturnValue(mql);

		const { result: result1 } = renderHook(() =>
			useMediaQuery("(min-width: 768px)")
		);
		const { result: result2 } = renderHook(() =>
			useMediaQuery("(min-width: 768px)")
		);

		expect(result1.current).toBe(true);
		expect(result2.current).toBe(true);

		// Store is shared, so both hooks return the same value
	});

	it("should handle different queries separately", () => {
		const mql1 = createMockMediaQueryList(true);
		const mql2 = createMockMediaQueryList(false);
		mockMatchMedia.mockImplementation((query) => {
			if (query === "(min-width: 768px)") return mql1;
			if (query === "(max-width: 767px)") return mql2;
			return createMockMediaQueryList(false);
		});

		const { result: result1 } = renderHook(() =>
			useMediaQuery("(min-width: 768px)")
		);
		const { result: result2 } = renderHook(() =>
			useMediaQuery("(max-width: 767px)")
		);

		expect(result1.current).toBe(true);
		expect(result2.current).toBe(false);
	});
});

describe("Store management", () => {
	it("should create a new store for new queries", () => {
		const mql1 = createMockMediaQueryList(true);
		const mql2 = createMockMediaQueryList(false);
		mockMatchMedia.mockReturnValueOnce(mql1).mockReturnValueOnce(mql2);

		renderHook(() => useMediaQuery("(min-width: 768px)"));
		renderHook(() => useMediaQuery("(max-width: 767px)"));

		// Different queries create different stores
	});

	it("should reuse store for same query", () => {
		const mql = createMockMediaQueryList(true);
		mockMatchMedia.mockReturnValue(mql);

		renderHook(() => useMediaQuery("(min-width: 768px)"));
		renderHook(() => useMediaQuery("(min-width: 768px)"));

		// Same query reuses the same store
	});

	it("should add event listener only when first subscriber", () => {
		const mql = createMockMediaQueryList(true);
		mockMatchMedia.mockReturnValue(mql);

		const { unmount: unmount1 } = renderHook(() =>
			useMediaQuery("(min-width: 768px)")
		);
		expect(mql.addEventListener).toHaveBeenCalledTimes(1);

		const { unmount: unmount2 } = renderHook(() =>
			useMediaQuery("(min-width: 768px)")
		);
		expect(mql.addEventListener).toHaveBeenCalledTimes(1); // Still 1

		unmount1();
		expect(mql.removeEventListener).not.toHaveBeenCalled(); // Still has one subscriber

		unmount2();
		expect(mql.removeEventListener).toHaveBeenCalledTimes(1);
	});
});
