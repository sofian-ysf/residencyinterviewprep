import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const logoPath = path.join(publicDir, 'logo2.png');

// Define sizes for different platforms
const iconSizes = {
  // Favicon sizes
  favicon: [16, 32, 48, 64],
  
  // Apple Touch Icons
  appleTouchIcon: [57, 60, 72, 76, 114, 120, 144, 152, 167, 180, 192],
  
  // Android Chrome
  androidChrome: [192, 512],
  
  // Microsoft Tiles
  msTile: [70, 144, 150, 310],
  
  // Open Graph and social media
  social: {
    og: { width: 1200, height: 630 },  // Open Graph (Facebook, LinkedIn)
    twitter: { width: 1200, height: 600 }, // Twitter
    whatsapp: { width: 400, height: 400 }, // WhatsApp square
  }
};

// Background color for padding (matches your brand)
const backgroundColor = '#f3f4f6';

async function generateIcons() {
  try {
    // Read the original logo
    const logoBuffer = await fs.promises.readFile(logoPath);
    const metadata = await sharp(logoBuffer).metadata();
    
    console.log(`Original logo dimensions: ${metadata.width}x${metadata.height}`);
    
    // Create a processed version with transparent background removed
    const processedLogo = await sharp(logoBuffer)
      .flatten({ background: backgroundColor })
      .toBuffer();

    // 1. Generate Favicon ICO (multi-size)
    console.log('\n🎯 Generating favicon.ico...');
    const favicon32 = await sharp(processedLogo)
      .resize(32, 32, { fit: 'contain', background: backgroundColor })
      .png()
      .toBuffer();
    
    await fs.promises.writeFile(
      path.join(publicDir, 'favicon.ico'),
      favicon32
    );
    
    // Also create PNG versions for modern browsers
    for (const size of iconSizes.favicon) {
      const buffer = await sharp(processedLogo)
        .resize(size, size, { fit: 'contain', background: backgroundColor })
        .png()
        .toBuffer();
      
      await fs.promises.writeFile(
        path.join(publicDir, `favicon-${size}x${size}.png`),
        buffer
      );
      console.log(`  ✓ favicon-${size}x${size}.png`);
    }

    // 2. Generate Apple Touch Icons
    console.log('\n🍎 Generating Apple Touch Icons...');
    for (const size of iconSizes.appleTouchIcon) {
      const buffer = await sharp(processedLogo)
        .resize(size, size, { 
          fit: 'contain', 
          background: backgroundColor 
        })
        .png()
        .toBuffer();
      
      await fs.promises.writeFile(
        path.join(publicDir, `apple-icon-${size}x${size}.png`),
        buffer
      );
      console.log(`  ✓ apple-icon-${size}x${size}.png`);
    }
    
    // Create the main apple-touch-icon
    const mainAppleIcon = await sharp(processedLogo)
      .resize(180, 180, { fit: 'contain', background: backgroundColor })
      .png()
      .toBuffer();
    
    await fs.promises.writeFile(
      path.join(publicDir, 'apple-touch-icon.png'),
      mainAppleIcon
    );
    console.log('  ✓ apple-touch-icon.png (main)');

    // 3. Generate Android Chrome Icons
    console.log('\n🤖 Generating Android Chrome Icons...');
    for (const size of iconSizes.androidChrome) {
      const buffer = await sharp(processedLogo)
        .resize(size, size, { 
          fit: 'contain', 
          background: backgroundColor 
        })
        .png()
        .toBuffer();
      
      await fs.promises.writeFile(
        path.join(publicDir, `android-chrome-${size}x${size}.png`),
        buffer
      );
      console.log(`  ✓ android-chrome-${size}x${size}.png`);
    }

    // 4. Generate MS Tile Icons
    console.log('\n🪟 Generating MS Tile Icons...');
    for (const size of iconSizes.msTile) {
      const buffer = await sharp(processedLogo)
        .resize(size, size, { 
          fit: 'contain', 
          background: backgroundColor 
        })
        .png()
        .toBuffer();
      
      await fs.promises.writeFile(
        path.join(publicDir, `ms-tile-${size}x${size}.png`),
        buffer
      );
      console.log(`  ✓ ms-tile-${size}x${size}.png`);
    }

    // 5. Generate Social Media Images
    console.log('\n📱 Generating Social Media Images...');
    
    // Open Graph (Facebook, LinkedIn)
    const ogBuffer = await sharp({
      create: {
        width: iconSizes.social.og.width,
        height: iconSizes.social.og.height,
        channels: 4,
        background: backgroundColor
      }
    })
    .composite([{
      input: await sharp(processedLogo)
        .resize(400, 400, { fit: 'contain' })
        .toBuffer(),
      gravity: 'center'
    }])
    .png()
    .toBuffer();
    
    await fs.promises.writeFile(
      path.join(publicDir, 'og-image.png'),
      ogBuffer
    );
    console.log('  ✓ og-image.png (1200x630)');

    // Twitter Card
    const twitterBuffer = await sharp({
      create: {
        width: iconSizes.social.twitter.width,
        height: iconSizes.social.twitter.height,
        channels: 4,
        background: backgroundColor
      }
    })
    .composite([{
      input: await sharp(processedLogo)
        .resize(400, 400, { fit: 'contain' })
        .toBuffer(),
      gravity: 'center'
    }])
    .png()
    .toBuffer();
    
    await fs.promises.writeFile(
      path.join(publicDir, 'twitter-image.png'),
      twitterBuffer
    );
    console.log('  ✓ twitter-image.png (1200x600)');

    // WhatsApp/iMessage Square
    const whatsappBuffer = await sharp(processedLogo)
      .resize(400, 400, { 
        fit: 'contain', 
        background: backgroundColor 
      })
      .png()
      .toBuffer();
    
    await fs.promises.writeFile(
      path.join(publicDir, 'whatsapp-image.png'),
      whatsappBuffer
    );
    console.log('  ✓ whatsapp-image.png (400x400)');

    // 6. Create site.webmanifest for PWA support
    const manifest = {
      name: 'MyERAS Reviewer',
      short_name: 'MyERAS',
      description: 'Expert ERAS Application Review Service',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      theme_color: '#ffffff',
      background_color: backgroundColor,
      display: 'standalone',
      start_url: '/'
    };

    await fs.promises.writeFile(
      path.join(publicDir, 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );
    console.log('\n📄 Created site.webmanifest');

    console.log('\n✅ All icons generated successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Update your app/layout.tsx with the new metadata configuration');
    console.log('2. Test the icons by sharing your link on different platforms');
    console.log('3. Use favicon checker tools to verify everything works');

  } catch (error) {
    console.error('Error generating icons:', error);
    process.exit(1);
  }
}

// Run the script
generateIcons();