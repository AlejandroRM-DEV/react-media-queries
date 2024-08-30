import { useState, useEffect } from 'react';

/**
 * A constant object containing common media queries.
 * @constant {Object}
 * @property {string} isDesktop - Media query for desktop screens (minimum width of 1025px).
 * @property {string} isTablet - Media query for tablet screens (width between 768px and 1024px).
 * @property {string} isMobile - Media query for mobile devices (maximum width of 767px).
 * @property {string} isLandscape - Media query for landscape orientation.
 * @property {string} isPortrait - Media query for portrait orientation.
 */
const mediaQueries = {
  isDesktop: '(min-width: 1025px)',
  isTablet: '(min-width: 768px) and (max-width: 1024px)',
  isMobile: '(max-width: 767px)',
  isLandscape: '(orientation: landscape)',
  isPortrait: '(orientation: portrait)',
};

/**
 * Custom React hook for evaluating a media query.
 *
 * This hook uses the `window.matchMedia` API to check if a given media query matches the current viewport.
 * It listens for changes to the media query and updates the state accordingly.
 *
 * @param {string} query - The media query string to evaluate.
 * @returns {boolean} - `true` if the media query matches the current viewport, `false` otherwise.
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const handleChange = (e) => setMatches(e.matches);

    mediaQueryList.addEventListener('change', handleChange);

    return () => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

/**
 * Custom React hook that provides boolean values for common media query states.
 *
 * This hook uses `useMediaQuery` to determine if the current viewport matches various media queries
 * related to device types and screen orientation. It returns an object with boolean properties indicating
 * whether each media query is currently matched.
 *
 * @returns {Object} - An object containing boolean values for various media queries.
 * @returns {boolean} isDesktop - `true` if the viewport width is at least 1025px, `false` otherwise.
 * @returns {boolean} isTablet - `true` if the viewport width is between 768px and 1024px, `false` otherwise.
 * @returns {boolean} isMobile - `true` if the viewport width is up to 767px, `false` otherwise.
 * @returns {boolean} isLandscape - `true` if the viewport orientation is landscape, `false` otherwise.
 * @returns {boolean} isPortrait - `true` if the viewport orientation is portrait, `false` otherwise.
 */
export function useMediaQueries(queries = mediaQueries) {
  const isDesktop = useMediaQuery(queries.isDesktop);
  const isTablet = useMediaQuery(queries.isTablet);
  const isMobile = useMediaQuery(queries.isMobile);
  const isLandscape = useMediaQuery(queries.isLandscape);
  const isPortrait = useMediaQuery(queries.isPortrait);

  return {
    isDesktop,
    isTablet,
    isMobile,
    isLandscape,
    isPortrait,
  };
}
