#!/usr/bin/env node

const yargs = require("yargs");
const clipboardy = require("node-clipboardy");
const info = require('../package.json');

yargs(process.argv.slice(2))
  .scriptName("imgtaggen")
  .usage('$0 [path/to/image]')
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
  }).command('*', "Image path (optional)", (yargs) => {
    yargs.positional('path', {
      describe: 'Path to the image file',
      type: 'string',
      default: '/image'
    })
  }, (argv) => {
    console.log('Generating image tag...')
    console.log('noavif:', argv.noavif)
    console.log('nowebp:', argv.nowebp)
    console.log('noclipboard:', argv.noclipboard)
    const path = yargs.argv._[0] || '/image';
    generateImgTag(argv.noavif, argv.nowebp, argv.noclipboard, path);
  })
  .version(info.version)
  .help()
  .argv


function generateImgTag (noavif, nowebp, noclipboard, path) {
  let tag = `<picture>\n`;

  if (!noavif) {
    tag += `  <source\n`;
    tag += `    type="image/avif"\n`;
    tag += `    srcset="${path}.avif?width=100 100w, ${path}.avif?width=200 200w, ${path}.avif?width=400 400w, ${path}.avif?width=800 800w" />\n`;
  }

  if (!nowebp) {
    tag += `  <source\n`;
    tag += `    type="image/webp"\n`;
    tag += `    srcset="${path}.webp?width=100 100w, ${path}.webp?width=200 200w, ${path}.webp?width=400 400w, ${path}.webp?width=800 800w" />\n`;
  }

  tag += `  <img\n`;
  tag += `    src="${path}.png"\n`;
  tag += `    srcset="${path}.png?width=100 100w, ${path}.png?width=200 200w, ${path}.png?width=400 400w, ${path}.png?width=800 800w"\n`;
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
