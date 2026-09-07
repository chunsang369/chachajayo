const sharp = require('sharp');
const path = require('path');

async function removeBg() {
  const root = process.cwd();
  const input = path.join(root, 'public/images/chachajayo-logo-original.png');
  const output = path.join(root, 'public/images/chachajayo-logo.png');
  const outputFooter = path.join(root, 'public/images/chachajayo-logo-footer.png');

  // Read image and get raw pixel data
  const image = sharp(input);
  const { width, height, channels } = await image.metadata();
  
  const rawBuffer = await image
    .ensureAlpha()
    .raw()
    .toBuffer();

  // Make white/near-white pixels transparent
  const pixels = Buffer.from(rawBuffer);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    
    // If pixel is white or near-white, make transparent
    if (r > 225 && g > 225 && b > 225) {
      pixels[i + 3] = 0; // Set alpha to 0
    }
  }

  // Save transparent logo for header (normal use)
  await sharp(pixels, { raw: { width, height, channels: 4 } })
    .trim()
    .png()
    .toFile(output);

  console.log('Header logo saved:', output);

  // Save footer version (inverted for dark background - make it white)
  const footerPixels = Buffer.from(pixels);
  for (let i = 0; i < footerPixels.length; i += 4) {
    const a = footerPixels[i + 3];
    if (a > 0) {
      // Make non-transparent pixels white for dark footer bg
      footerPixels[i] = 255;     // R
      footerPixels[i + 1] = 255; // G
      footerPixels[i + 2] = 255; // B
    }
  }

  await sharp(footerPixels, { raw: { width, height, channels: 4 } })
    .trim()
    .png()
    .toFile(outputFooter);

  console.log('Footer logo saved:', outputFooter);
  console.log('Done!');
}

removeBg().catch(console.error);
