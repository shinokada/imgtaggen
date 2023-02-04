<h1 align="center">IMGTAGGEN</h1>


<p align="center">
<a href="https://imgtaggen.codewithshin.com/" rel="nofollow">Image Tag Generator</a>
</p>

<p align="center">
<a href="https://github.com/sponsors/shinokada" target="_blank"><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor" height="22" width="102"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"><img src="https://img.shields.io/badge/PWA-enabled-brightgreen" alt="PWA Shield"></a>
<a href="https://www.npmjs.com/package/imgtaggen" rel="nofollow" target="_blank"><img src="https://img.shields.io/npm/v/imgtaggen" alt="npm" height="22" width="97"></a>
<a href="https://twitter.com/shinokada" rel="nofollow" target="_blank"><img src="https://img.shields.io/badge/created%20by-@shinokada-4BBAAB.svg" alt="Created by Shin Okada" height="22" width="161"></a>
<a href="http://www.apache.org/licenses/" rel="nofollow" target="_blank"><img src="https://img.shields.io/github/license/shinokada/imgtaggen" alt="License" height="22" width="132"></a>
<a href="https://www.npmjs.com/package/imgtaggen" rel="nofollow" target="_blank"><img src="https://img.shields.io/npm/dw/imgtaggen.svg" alt="npm" height="22" width="152"></a>
</p>

A CLI tool for generating a responsive image tag with support for AVIF and WebP formats

<p align="center">
<picture>
  <source
    type="image/avif"
    srcset="/image.avif?width=100 100w, /image.avif?width=200 200w, /image.avif?width=400 400w, /image.avif?width=800 800w" />
  <source
    type="image/webp"
    srcset="/image.webp?width=100 100w, /image.webp?width=200 200w, /image.webp?width=400 400w, /image.webp?width=800 800w" />
  <img
    src="/image.png"
    srcset="/image.png?width=100 100w, /image.png?width=200 200w, /image.png?width=400 400w, /image.png?width=800 800w"
    sizes="(max-width: 800px) 100vw, 50vw"
    style="width: 100%; aspect-ratio: 16/9"
    loading="lazy"
    decoding="async"
    alt="Builder.io drag and drop interface"
  />
</picture>
</p>
## Installation

```
npm i -g imgtaggen
```

## Options

imgtaggen [args]

|Options|Description|Default|
|--|--|--|
|--noavif|Do not generate an AVIF image tag |[boolean] [default: false]|
|--nowebp|Do not generate a WEBP image tag |[boolean] [default: false]|
|--noclipboard|Do not copy the image tag to the clipboard|[boolean] [default: false]|
|--version|Show version number ||
|--help|Show help||


## Command examples

```bash
imgtaggen
```

This will copy the following to your clipboard.

```html
<picture>
  <source
    type="image/avif"
    srcset="/image.avif?width=100 100w, /image.avif?width=200 200w, /image.avif?width=400 400w, /image.avif?width=800 800w" />
  <source
    type="image/webp"
    srcset="/image.webp?width=100 100w, /image.webp?width=200 200w, /image.webp?width=400 400w, /image.webp?width=800 800w" />
  <img
    src="/image.png"
    srcset="/image.png?width=100 100w, /image.png?width=200 200w, /image.png?width=400 400w, /image.png?width=800 800w"
    sizes="(max-width: 800px) 100vw, 50vw"
    style="width: 100%; aspect-ratio: 16/9"
    loading="lazy"
    decoding="async"
    alt="Builder.io drag and drop interface"
  />
</picture>
```

The above code is in your clipboard, you just need to paster it and update for your needs.


```bash
imgtaggen --noavif
```

Output:

```html
<picture>
  <source
    type="image/webp"
    srcset="/image.webp?width=100 100w, /image.webp?width=200 200w, /image.webp?width=400 400w, /image.webp?width=800 800w" />
  <img
    src="/image.png"
    srcset="/image.png?width=100 100w, /image.png?width=200 200w, /image.png?width=400 400w, /image.png?width=800 800w"
    sizes="(max-width: 800px) 100vw, 50vw"
    style="width: 100%; aspect-ratio: 16/9"
    loading="lazy"
    decoding="async"
    alt="Builder.io drag and drop interface"
  />
</picture>
```

```bash
imgtaggen --nowebp
```

Output:

```html
<picture>
  <source
    type="image/avif"
    srcset="/image.avif?width=100 100w, /image.avif?width=200 200w, /image.avif?width=400 400w, /image.avif?width=800 800w" />
  <img
    src="/image.png"
    srcset="/image.png?width=100 100w, /image.png?width=200 200w, /image.png?width=400 400w, /image.png?width=800 800w"
    sizes="(max-width: 800px) 100vw, 50vw"
    style="width: 100%; aspect-ratio: 16/9"
    loading="lazy"
    decoding="async"
    alt="Builder.io drag and drop interface"
  />
</picture>
```

```bash
imgtaggen --nowebp --noavif
```

Output:

```html
<picture>
  <img
    src="/image.png"
    srcset="/image.png?width=100 100w, /image.png?width=200 200w, /image.png?width=400 400w, /image.png?width=800 800w"
    sizes="(max-width: 800px) 100vw, 50vw"
    style="width: 100%; aspect-ratio: 16/9"
    loading="lazy"
    decoding="async"
    alt="Builder.io drag and drop interface"
  />
</picture>
```


```bash
imgtaggen --noclipboard
```

This command outputs the following on your terminal.

```html
<picture>
  <source
    type="image/avif"
    srcset="/image.avif?width=100 100w, /image.avif?width=200 200w, /image.avif?width=400 400w, /image.avif?width=800 800w" />
  <source
    type="image/webp"
    srcset="/image.webp?width=100 100w, /image.webp?width=200 200w, /image.webp?width=400 400w, /image.webp?width=800 800w" />
  <img
    src="/image.png"
    srcset="/image.png?width=100 100w, /image.png?width=200 200w, /image.png?width=400 400w, /image.png?width=800 800w"
    sizes="(max-width: 800px) 100vw, 50vw"
    style="width: 100%; aspect-ratio: 16/9"
    loading="lazy"
    decoding="async"
    alt="Builder.io drag and drop interface"
  />
</picture>
```

## PWA: Fast & Offline

This website can be downloaded and installed on your device for offline access as a Progressive Web App.

To install a PWA, look for the "Add to Home Screen" option in the browser's menu or settings. On most mobile devices, this option can be found by visiting the website, then selecting the "Options" or "Menu" button in the browser, and looking for the "Add to Home Screen" option. On some desktop browsers, right-click on the page and select "Install".