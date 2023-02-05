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
    alt: {
      type: 'string',
      default: 'My awesome image',
      describe: 'Alternative text for the image',
      alias: 'a'
    },
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
  }, async (argv) => {
    // if (argv._.length === 0 || argv.help) {
    //   yargs.showHelp();
    //   process.exit(0);
    // }
    console.log('Generating image tag...')
    console.log('noavif:', argv.noavif)
    console.log('nowebp:', argv.nowebp)
    console.log('noclipboard:', argv.noclipboard)
    console.log('sizes:', argv.sizes)
    const inputFile = yargs.argv._[0] || 'image';
    // const inputFile = yargs.args._[0];
    console.log('input file:', inputFile)
    try {
      await generateImgTag(argv.noavif, argv.nowebp, argv.noclipboard, argv.sizes, inputFile, argv.alt);
    } catch (error) {
      console.error(`🚫❌ An error occurred: ${error.message}`);
      process.exit(1);
    }
  })
  .version(version)
  .help()
  .argv

async function findAspectRatio(filepath) {
  try {
    const image = sharp(filepath);
    const metadata = await image.metadata();
    return metadata.width / metadata.height;
  } catch (error) {
    console.error(`🚫❌ Failed to get aspect ratio of ${filepath}: ${error.message}`);
    return 16 / 9;
  }
}

async function generateImgTag (noavif, nowebp, noclipboard, sizes, inputFile, alt) {
  try {
    const directory = `${path.dirname(inputFile)}/`;
    const inputFileBase = path.basename(inputFile);
    const { name, ext } = path.parse(inputFileBase);
    let tag = `<picture>\n`;

    if (!noavif) {
      tag += `  <source\n`;
      tag += `    type="image/avif"\n`;
      tag += `    srcset="` + sizes.map(size => `${directory}${name}-${size}.avif?width=${size} ${size}w`).join(', ') + `" />\n`;
    }

    if (!nowebp) {
      tag += `  <source\n`;
      tag += `    type="image/webp"\n`;
      tag += `    srcset="` + sizes.map(size => `${directory}${name}-${size}.webp?width=${size} ${size}w`).join(', ') + `" />\n`;
    }
    
    const ratio = await findAspectRatio(inputFile);
    tag += `  <img\n`;
    tag += `    src="${inputFile}"\n`;
    tag += `    srcset="` + sizes.map(size => `${directory}${name}-${size}${ext}?width=${size} ${size}w`).join(', ') + `"\n`;
    tag += `    sizes="(max-width: 800px) 100vw, 50vw"\n`;
    tag += `    style="width: 100%; aspect-ratio: ${ratio}"\n`;
    tag += `    loading="lazy"\n`;
    tag += `    decoding="async"\n`;
    tag += `    alt="${alt}"\n`;
    tag += `  />\n`;
    tag += `</picture>\n`;

    if (!noclipboard) {
      clipboardy.writeSync(tag);
      console.log("🚀✅🎉 Copied output to the clipboard 🔥🔥🔥🔥");
    } else {
      console.log(tag);
    }
  } catch (error) {
    console.error(`🚫❌ error`);
    process.exit(1);
  }
}
