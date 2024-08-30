# React Media Queries

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

`react-media-queries` is a React hooks library that provides useful custom hooks for responsive design and media queries.

## Installation

```bash
npm i @alejandrorm-dev/react-media-queries
```

## Demo


https://github.com/user-attachments/assets/dd7719a8-a3bd-4da5-93c2-126bdfc8ceb7



## Hooks

### useMediaQuery

A React hook for evaluating a media query.

#### Usage

```javascript
import { useMediaQuery } from 'mx-hooks';

function MyComponent() {
  const isLargeScreen = useMediaQuery('(min-width: 1200px)');

  return <div>{isLargeScreen ? 'Large screen' : 'Small screen'}</div>;
}
```

### useMediaQueries

A React hook that provides boolean values for common media query states.

#### Usage

```javascript
import { useMediaQueries } from 'mx-hooks';

function MyComponent() {
  const { isDesktop, isTablet, isMobile, isLandscape, isPortrait } = useMediaQueries();

  return (
    <div>
      <p>Device type: {isDesktop ? 'Desktop' : isTablet ? 'Tablet' : 'Mobile'}</p>
      <p>Orientation: {isLandscape ? 'Landscape' : 'Portrait'}</p>
    </div>
  );
}
```

## API Reference

### useMediaQuery(query: string): boolean

- `query`: A media query string to evaluate.
- Returns: `true` if the media query matches the current viewport, `false` otherwise.

### useMediaQueries(queries?: object): object

- `queries` (optional): An object containing custom media query strings. If not provided, default queries will be used.
- Returns: An object with the following boolean properties:
  - `isDesktop`: `true` if the viewport width is at least 1025px.
  - `isTablet`: `true` if the viewport width is between 768px and 1024px.
  - `isMobile`: `true` if the viewport width is up to 767px.
  - `isLandscape`: `true` if the viewport orientation is landscape.
  - `isPortrait`: `true` if the viewport orientation is portrait.

## Default Media Queries

The `useMediaQueries` hook uses the following default media queries:

- Desktop: `(min-width: 1025px)`
- Tablet: `(min-width: 768px) and (max-width: 1024px)`
- Mobile: `(max-width: 767px)`
- Landscape: `(orientation: landscape)`
- Portrait: `(orientation: portrait)`

You can override these by passing your own queries object to `useMediaQueries`.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/AlejandroRM-DEV"><img src="https://avatars.githubusercontent.com/u/8054357?v=4?s=100" width="100px;" alt="Alejandro Ramírez Muñoz"/><br /><sub><b>Alejandro Ramírez Muñoz</b></sub></a><br /><a href="https://github.com/AlejandroRM-DEV/react-media-queries/commits?author=AlejandroRM-DEV" title="Code">💻</a> <a href="https://github.com/AlejandroRM-DEV/react-media-queries/commits?author=AlejandroRM-DEV" title="Tests">⚠️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
