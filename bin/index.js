#!/usr/bin/env node

const yargs = require("yargs");
const clipboardy = require("node-clipboardy");
const sharp = require("sharp");
const path = require("path")
const {version} = require('../package.json');

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
    },
    sizes: {
      type: 'array',
      describe: 'List of sizes to generate',
      demandOption: true,
      default: [100, 200, 400, 800],
      alias: 's'
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
    console.log('sizes:', argv.sizes)
    const inputFile = yargs.argv._[0] || '/image';
    // const inputFile = yargs.args._[0];
    console.log('input file:', inputFile)
    generateImgTag(argv.noavif, argv.nowebp, argv.noclipboard, argv.sizes, inputFile);
  })
  .version(version)
  .help()
  .argv

async function findAspectRatio(filepath) {
  const image = sharp(filepath);
  const metadata = await image.metadata();
  return metadata.width / metadata.height;
}

async function generateImgTag (noavif, nowebp, noclipboard, sizes, inputFile) {
  const directory = `${path.dirname(inputFile)}/`;
  console.log('dir:', directory)
  const inputFileBase = path.basename(inputFile);
  console.log('input file base:', inputFileBase)
  const { name, ext } = path.parse(inputFileBase);
  console.log('name, ext:', name, ext)
  let tag = `<picture>\n`;

  if (!noavif) {
    tag += `  <source\n`;
    tag += `    type="image/avif"\n`;
    tag += `    srcset="` + sizes.map(size => `${directory}${name}.avif?width=${size} ${size}w`).join(', ') + `" />\n`;
  }
console.log('done noavif')
  if (!nowebp) {
    tag += `  <source\n`;
    tag += `    type="image/webp"\n`;
    tag += `    srcset="` + sizes.map(size => `${directory}${name}.webp?width=${size} ${size}w`).join(', ') + `" />\n`;
  }
  
  const ratio = await findAspectRatio(inputFile);
  console.log('ratio:', ratio)
  tag += `  <img\n`;
  tag += `    src="${inputFile}"\n`;
console.log('check 1')
  tag += `    srcset="` + sizes.map(size => `${inputFile}?width=${size} ${size}w`).join(', ') + `"`;
  tag += `    sizes="(max-width: 800px) 100vw, 50vw"\n`;
  tag += `    style="width: 100%; aspect-ratio: ${ratio}"\n`;
  tag += `    loading="lazy"\n`;
  tag += `    decoding="async"\n`;
  tag += `    alt="Builder.io drag and drop interface"\n`;
  tag += `  />\n`;
  tag += `</picture>\n`;
console.log('check 2')

  if (!noclipboard) {
    clipboardy.writeSync(tag);
    console.log("Copied output to the clipboard");
  } else {
    console.log(tag);
  }
}
