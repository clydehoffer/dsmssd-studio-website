#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const https = require('https');

// Supabase configuration
const SUPABASE_URL = 'https://lwurlldzyvkljifljjfo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3dXJsbGR6eXZrbGppZmxqamZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTgzMjE3OCwiZXhwIjoyMDcxNDA4MTc4fQ.5KMKFk8JMJsDwlOI_6RuNcchTAmh4b0PbL-UzFTowUo';
const BUCKET_NAME = 'portfolio-images';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Read and parse current gallery data
const galleryDataContent = fs.readFileSync('./src/data/galleryData.ts', 'utf8');
const galleryDataMatch = galleryDataContent.match(/export const galleryData: GalleryData = ({[\s\S]*});/);
if (!galleryDataMatch) {
  throw new Error('Could not parse galleryData from TypeScript file');
}
const galleryData = eval(`(${galleryDataMatch[1]})`);

// Function to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath);
      reject(err);
    });
  });
}

// Function to optimize image
async function optimizeImage(inputPath, outputPath, width, height, quality) {
  await sharp(inputPath)
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 1 } })
    .webp({ quality })
    .toFile(outputPath);
}

// Function to upload to Supabase
async function uploadToSupabase(filePath, supabasePath) {
  const fileContent = fs.readFileSync(filePath);
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(supabasePath, fileContent, {
      contentType: 'image/webp',
      cacheControl: '3600',
      upsert: true
    });

  if (error) {
    throw error;
  }
  
  return data;
}

async function main() {
  console.log('🎯 Starting image optimization process...');
  
  // Create temp directories
  const tempDir = './temp-images';
  const optimizedDir = './temp-optimized';
  
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
  if (!fs.existsSync(optimizedDir)) fs.mkdirSync(optimizedDir);
  
  const optimizedGalleryData = {};
  let processedCount = 0;
  
  try {
    // Process each gallery
    for (const [galleryId, images] of Object.entries(galleryData)) {
      console.log(`\n📁 Processing Gallery ${galleryId} (${images.length} images)...`);
      optimizedGalleryData[galleryId] = [];
      
      // Process first 3 images from each gallery for speed
      const imagesToProcess = images.slice(0, 3);
      
      for (let i = 0; i < imagesToProcess.length; i++) {
        const item = imagesToProcess[i];
        const imageUrl = item.original;
        const fileName = `gallery_${galleryId}_${i}.jpg`;
        const optimizedFileName = `gallery_${galleryId}_${i}_thumb.webp`;
        
        const tempPath = path.join(tempDir, fileName);
        const optimizedPath = path.join(optimizedDir, optimizedFileName);
        
        try {
          console.log(`  ⬇️  Downloading ${fileName}...`);
          await downloadImage(imageUrl, tempPath);
          
          console.log(`  🔧 Optimizing to 400x300 WebP...`);
          await optimizeImage(tempPath, optimizedPath, 400, 300, 70);
          
          console.log(`  ⬆️  Uploading optimized version...`);
          const supabasePath = `portfolio-optimized/gallery_${galleryId}_${i}_thumb.webp`;
          await uploadToSupabase(optimizedPath, supabasePath);
          
          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(supabasePath);
          
          optimizedGalleryData[galleryId].push({
            original: item.original, // Keep original for lightbox
            thumbnail: publicUrl,    // Use optimized for thumbnails
            title: item.title,
            description: item.description
          });
          
          processedCount++;
          console.log(`  ✅ Processed ${fileName} (${processedCount} total)`);
          
          // Clean up temp files
          fs.unlinkSync(tempPath);
          fs.unlinkSync(optimizedPath);
          
        } catch (error) {
          console.error(`  ❌ Failed to process ${fileName}:`, error.message);
        }
      }
    }
    
    // Update galleryData.ts with optimized versions
    const newGalleryData = `// Auto-generated gallery data with optimized thumbnails
// Generated on: ${new Date().toISOString()}

export interface GalleryItem {
  original: string;
  thumbnail: string;
  title: string;
  description: string;
}

export interface GalleryData {
  [key: string]: GalleryItem[];
}

export const galleryData: GalleryData = ${JSON.stringify(optimizedGalleryData, null, 2)};
`;
    
    // Backup current file
    if (fs.existsSync('./src/data/galleryData.ts')) {
      fs.copyFileSync('./src/data/galleryData.ts', './src/data/galleryData.backup2.ts');
    }
    
    fs.writeFileSync('./src/data/galleryData.ts', newGalleryData);
    
    console.log(`\n🎉 Optimization complete!`);
    console.log(`📊 Processed ${processedCount} images`);
    console.log(`💾 Updated galleryData.ts with optimized thumbnails`);
    console.log(`🔄 Original images kept for lightbox, thumbnails optimized for popups`);
    
  } catch (error) {
    console.error('💥 Error during optimization:', error);
  } finally {
    // Clean up temp directories
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
    if (fs.existsSync(optimizedDir)) {
      fs.rmSync(optimizedDir, { recursive: true, force: true });
    }
  }
}

main().catch(console.error);
