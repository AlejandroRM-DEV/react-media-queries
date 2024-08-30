import { renderHook } from '@testing-library/react-hooks';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useMediaQueries, useMediaQuery } from './mediaQueries';

describe('useMediaQueries', () => {
  let originalMatchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  const mockMatchMedia = (query, matches) => {
    window.matchMedia = (q) => ({
      matches: q === query ? matches : !matches,
      addEventListener: () => {},
      removeEventListener: () => {},
    });
  };

  it('should return true for isDesktop and false for others when screen width is 1025px or more', () => {
    mockMatchMedia('(min-width: 1025px)', true);

    const { result } = renderHook(() => useMediaQueries());

    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isMobile).toBe(false);
  });

  it('should return true for isTablet and false for others when screen width is between 768px and 1024px', () => {
    mockMatchMedia('(min-width: 768px) and (max-width: 1024px)', true);

    const { result } = renderHook(() => useMediaQueries());

    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isMobile).toBe(false);
  });

  it('should return true for isMobile and false for others when screen width is 767px or less', () => {
    mockMatchMedia('(max-width: 767px)', true);

    const { result } = renderHook(() => useMediaQueries());

    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isMobile).toBe(true);
  });

  it('should return true for isLandscape and false for others when screen orientation is landscape', () => {
    mockMatchMedia('(orientation: landscape)', true);

    const { result } = renderHook(() => useMediaQueries());

    expect(result.current.isLandscape).toBe(true);
    expect(result.current.isPortrait).toBe(false);
  });

  it('should return true for isPortrait and false for others when screen orientation is portrait', () => {
    mockMatchMedia('(orientation: portrait)', true);

    const { result } = renderHook(() => useMediaQueries());

    expect(result.current.isLandscape).toBe(false);
    expect(result.current.isPortrait).toBe(true);
  });

  it('should handle multiple custom queries', () => {
    const customQuery1 = '(min-width: 500px)';
    const customQuery2 = '(max-width: 300px)';

    mockMatchMedia(customQuery1, true);
    mockMatchMedia(customQuery2, false);

    const { result: result1 } = renderHook(() => useMediaQuery(customQuery1));
    const { result: result2 } = renderHook(() => useMediaQuery(customQuery2));

    expect(result1.current).toBe(true);
    expect(result2.current).toBe(false);
  });
});
