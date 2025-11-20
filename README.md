# React Media Queries

![Build Status](https://img.shields.io/github/actions/workflow/status/AlejandroRM-DEV/react-media-queries/release.yml?branch=main)
![npm version](https://img.shields.io/npm/v/@alejandrorm-dev/react-media-queries)
![npm](https://img.shields.io/npm/dw/@alejandrorm-dev/react-media-queries)
![License](https://img.shields.io/badge/license-MIT-blue)
![GitHub issues](https://img.shields.io/github/issues/AlejandroRM-DEV/react-media-queries)
![GitHub forks](https://img.shields.io/github/forks/AlejandroRM-DEV/react-media-queries)
![GitHub stars](https://img.shields.io/github/stars/AlejandroRM-DEV/react-media-queries)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

A lightweight, performant React hooks library for responsive design and media query management. Built with TypeScript and optimized for modern React applications, including SSR support.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Demo](#demo)
- [Usage](#usage)
- [API Reference](#api-reference)
- [SSR Support](#ssr-support)
- [License](#license)
- [Contributing](#contributing)
- [Contributors](#contributors-)

## Features

- 🚀 **Performant**: Uses `useSyncExternalStore` for optimal performance and React 18+ compatibility
- 🔄 **SSR Compatible**: Handles server-side rendering gracefully
- 🎯 **TypeScript**: Full TypeScript support with type definitions
- 🪝 **Hooks-Based**: Modern React hooks API
- ⚡ **Efficient**: Shared stores prevent duplicate media query listeners

## Installation

```bash
npm install @alejandrorm-dev/react-media-queries
```

## Demo

https://github.com/user-attachments/assets/dd7719a8-a3bd-4da5-93c2-126bdfc8ceb7

## Usage

```typescript
import { useMediaQuery } from "@alejandrorm-dev/react-media-queries";

function ResponsiveComponent() {
	const isLargeScreen = useMediaQuery("(min-width: 1200px)");

	return (
		<div>{isLargeScreen ? "Large screen layout" : "Small screen layout"}</div>
	);
}
```

## API Reference

### `useMediaQuery(query: string): boolean`

Evaluates a single CSS media query and returns its current match state.

**Parameters:**

- `query` (string): The CSS media query string to evaluate (e.g., `"(min-width: 768px)"`)

**Returns:** `boolean` - `true` if the media query matches, `false` otherwise. Returns `false` during SSR.

**Example:**

```typescript
const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1024px)");
```

## SSR Support

The hook is designed to work seamlessly in server-side rendering environments. During SSR, `useMediaQuery` returns `false`. On the client, the value updates to reflect the actual media query state.

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
