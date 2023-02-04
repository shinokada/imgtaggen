# imgtaggen

A CLI tool for generating a responsive image tag with support for AVIF and WebP formats

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

You need to update for your needs.

