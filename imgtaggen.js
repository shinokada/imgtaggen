#!/usr/bin/env node

import yargs from "yargs";
import clipboardy from "clipboardy";

yargs(process.argv.slice(2))
  .scriptName("imgtaggen")
  .usage('$0 <cmd> [args]')
  .options({
    noavif: {
      type: 'boolean',
      default: false,
      describe: 'Do not generate an AVIF image tag'
    },
    nowebp: {
      type: 'boolean',
      default: false,
      describe: 'Do not generate a WEBP image tag'
    },
    noclipboard: {
      type: 'boolean',
      default: false,
      describe: 'Do not copy the image tag to the clipboard'
    }
  }).command('*', "Fallback command", (yargs) => {
  }, (argv) => {
    console.log('Generating image tag...')
    console.log('noavif:', argv.noavif)
    console.log('nowebp:', argv.nowebp)
    console.log('noclipboard:', argv.noclipboard)
    generateImgTag(argv.noavif, argv.nowebp, argv.noclipboard);
  })
  .version("1.0.0")
  .help()
  .argv


function generateImgTag (noavif, nowebp, noclipboard) {
  let tag = `<picture>\n`;

  if (!noavif) {
    tag += `  <source\n`;
    tag += `    type="image/avif"\n`;
    tag += `    srcset="/image.avif?width=100 100w, /image.avif?width=200 200w, /image.avif?width=400 400w, /image.avif?width=800 800w" />\n`;
  }

  if (!nowebp) {
    tag += `  <source\n`;
    tag += `    type="image/webp"\n`;
    tag += `    srcset="/image.webp?width=100 100w, /image.webp?width=200 200w, /image.webp?width=400 400w, /image.webp?width=800 800w" />\n`;
  }

  tag += `  <img\n`;
  tag += `    src="/image.png"\n`;
  tag += `    srcset="/image.png?width=100 100w, /image.png?width=200 200w, /image.png?width=400 400w, /image.png?width=800 800w"\n`;
  tag += `    sizes="(max-width: 800px) 100vw, 50vw"\n`;
  tag += `    style="width: 100%; aspect-ratio: 16/9"\n`;
  tag += `    loading="lazy"\n`;
  tag += `    decoding="async"\n`;
  tag += `    alt="Builder.io drag and drop interface"\n`;
  tag += `  />\n`;
  tag += `</picture>\n`;

  

  if (!noclipboard) {
    clipboardy.writeSync(tag);
    console.log("Copied output to the clipboard");
  } else {
    console.log(tag);
  }
}
