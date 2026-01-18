# Progressive Web App (PWA)

## Overview

Habit Forge is a fully-featured PWA that can be installed on mobile devices and desktops, and works offline.

## Features

| Feature | Support |
|---------|---------|
| Installable | Yes |
| Offline | Yes |
| Push Notifications | No (planned) |
| Background Sync | No |

## Configuration

PWA is configured via `vite-plugin-pwa` in `vite.config.ts`:

```typescript
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
  manifest: {
    name: 'Habit Forge',
    short_name: 'HabitForge',
    description: 'Track your habits and build better routines',
    theme_color: '#6366f1',
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/habit-forge/',
    start_url: '/habit-forge/',
    icons: [/* ... */],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
    runtimeCaching: [/* Google Fonts caching */],
  },
})
```

## Icons

| File | Size | Purpose |
|------|------|---------|
| `favicon.svg` | Scalable | Browser tab icon |
| `pwa-192x192.png` | 192x192 | Android home screen |
| `pwa-512x512.png` | 512x512 | Android splash, maskable |
| `apple-touch-icon.png` | 180x180 | iOS home screen |

### Generating Icons

Icons are generated from `favicon.svg` using Sharp:

```bash
node scripts/generate-icons.mjs
```

## Service Worker

### Caching Strategy

| Resource Type | Strategy | Cache Name |
|---------------|----------|------------|
| App shell (HTML, JS, CSS) | Precache | workbox-precache |
| Static assets (images, fonts) | Precache | workbox-precache |
| Google Fonts | CacheFirst | google-fonts-cache |

### Precached Assets

The service worker precaches all build outputs:
- `**/*.js` - JavaScript bundles
- `**/*.css` - Stylesheets
- `**/*.html` - HTML files
- `**/*.png` - PNG images
- `**/*.svg` - SVG icons
- `**/*.woff2` - Web fonts

### Auto-Update

The service worker auto-updates when new content is available:
1. User loads the app
2. SW checks for updates in background
3. New SW installs and waits
4. On next navigation, new SW activates
5. Page refreshes with new content

## Installation

### iOS (Safari only)

1. Open app in Safari
2. Tap Share button (square with arrow)
3. Tap "Add to Home Screen"
4. Enter name and tap "Add"

**Note:** Chrome/Firefox on iOS cannot install PWAs (Apple restriction).

### Android (Chrome)

1. Open app in Chrome
2. Tap "Install" banner, or
3. Tap menu (⋮) → "Install app"

### Desktop (Chrome/Edge)

1. Open app in Chrome or Edge
2. Click install icon in address bar, or
3. Click menu → "Install Habit Forge..."

## iOS-Specific Configuration

### Meta Tags (`index.html`)

```html
<!-- Enable standalone mode -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- Status bar style -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<!-- App title on home screen -->
<meta name="apple-mobile-web-app-title" content="Habit Forge" />

<!-- Disable phone number detection -->
<meta name="format-detection" content="telephone=no" />

<!-- Touch icon -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

### Viewport Configuration

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
```

- `maximum-scale=1.0, user-scalable=no` - Prevents zoom (app-like feel)
- `viewport-fit=cover` - Extends content behind notch/home indicator

### Safe Area Insets

```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```

This ensures content isn't obscured by:
- iPhone notch (top)
- Home indicator (bottom)
- Rounded corners

## Manifest File

Generated at build time: `dist/manifest.webmanifest`

```json
{
  "name": "Habit Forge",
  "short_name": "HabitForge",
  "description": "Track your habits and build better routines",
  "theme_color": "#6366f1",
  "background_color": "#ffffff",
  "display": "standalone",
  "scope": "/habit-forge/",
  "start_url": "/habit-forge/",
  "icons": [
    { "src": "pwa-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "pwa-512x512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "pwa-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

## Offline Behavior

When offline:
1. Service worker intercepts all requests
2. Returns cached assets
3. App functions fully (localStorage-based)
4. No network requests needed

Since all data is in localStorage, the app works identically offline and online.

## Debugging

### Chrome DevTools

1. Open DevTools (F12)
2. Go to Application tab
3. Check:
   - **Manifest** - Verify manifest loaded
   - **Service Workers** - Check SW status
   - **Cache Storage** - View cached assets

### Testing Offline

1. DevTools → Application → Service Workers
2. Check "Offline"
3. Reload page - should work fully

### Updating Service Worker

Force update during development:
1. DevTools → Application → Service Workers
2. Click "Update" or check "Update on reload"
