#!/usr/bin/env node

/**
 * Supabase Portfolio Image Upload Script
 * 
 * This script uploads all portfolio images from public/images/portfolio/
 * to Supabase Storage and generates the new galleryData.ts file
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const SUPABASE_URL = 'https://lwurlldzyvkljifljjfo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3dXJsbGR6eXZrbGppZmxqamZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTgzMjE3OCwiZXhwIjoyMDcxNDA4MTc4fQ.5KMKFk8JMJsDwlOI_6RuNcchTAmh4b0PbL-UzFTowUo';
const BUCKET_NAME = 'portfolio-images';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Portfolio folder mapping
const PORTFOLIO_FOLDERS = {
  '1': 'Brand Identity & Visual Systems',
  '2': 'Digital Design & Web Development', 
  '3': 'Event Design & Experiential',
  '4': 'Fashion & Product Design',
  '5': 'Interactive & Motion Design',
  '6': 'Lifestyle & Commercial Photography'
};

/**
 * Get all image files from a directory
 */
function getImageFiles(dir) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG'];
  
  if (!fs.existsSync(dir)) {
    return [];
  }
  
  return fs.readdirSync(dir)
    .filter(file => imageExtensions.includes(path.extname(file)))
    .map(file => path.join(dir, file));
}

/**
 * Upload a single file to Supabase Storage
 */
async function uploadFile(filePath, storagePath) {
  try {
    console.log(`📤 Uploading: ${storagePath}`);
    
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType: `image/${path.extname(fileName).slice(1)}`,
        upsert: true // Overwrite if exists
      });

    if (error) {
      console.error(`❌ Error uploading ${storagePath}:`, error.message);
      return null;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);

    console.log(`✅ Uploaded: ${publicUrl}`);
    return publicUrl;
    
  } catch (err) {
    console.error(`❌ Error uploading ${storagePath}:`, err.message);
    return null;
  }
}

/**
 * Generate thumbnail URL with Supabase image transformation
 */
function getThumbnailUrl(publicUrl) {
  return publicUrl + '?width=400&height=300&quality=80';
}

/**
 * Main upload function
 */
async function uploadPortfolioImages() {
  console.log('🚀 Starting portfolio image upload to Supabase...\n');
  
  const portfolioDir = path.join(__dirname, 'public', 'images', 'portfolio');
  const newGalleryData = {};
  
  let totalUploaded = 0;
  let totalFailed = 0;

  // Process each portfolio folder
  for (const [folderId, folderName] of Object.entries(PORTFOLIO_FOLDERS)) {
    console.log(`\n📁 Processing Portfolio ${folderId}: ${folderName}`);
    
    const folderPath = path.join(portfolioDir, folderId);
    const imageFiles = getImageFiles(folderPath);
    
    if (imageFiles.length === 0) {
      console.log(`⚠️  No images found in portfolio ${folderId}`);
      continue;
    }
    
    console.log(`   Found ${imageFiles.length} images`);
    
    const galleryItems = [];
    
    // Upload each image in the folder
    for (let i = 0; i < imageFiles.length; i++) {
      const filePath = imageFiles[i];
      const fileName = path.basename(filePath);
      const storagePath = `portfolio/${folderId}/${fileName}`;
      
      const publicUrl = await uploadFile(filePath, storagePath);
      
      if (publicUrl) {
        galleryItems.push({
          original: publicUrl,
          thumbnail: getThumbnailUrl(publicUrl),
          title: `${folderName} - Image ${i + 1}`,
          description: `Portfolio piece from ${folderName} collection`
        });
        totalUploaded++;
      } else {
        totalFailed++;
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    newGalleryData[folderId] = galleryItems;
  }
  
  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✅ Successfully uploaded: ${totalUploaded} images`);
  console.log(`   ❌ Failed uploads: ${totalFailed} images`);
  
  // Generate new galleryData.ts file
  if (totalUploaded > 0) {
    const galleryDataContent = `// Auto-generated gallery data with Supabase URLs
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

export const galleryData: GalleryData = ${JSON.stringify(newGalleryData, null, 2)};
`;
    
    // Backup the original file
    const originalPath = path.join(__dirname, 'src', 'data', 'galleryData.ts');
    const backupPath = path.join(__dirname, 'src', 'data', 'galleryData.backup.ts');
    
    if (fs.existsSync(originalPath)) {
      fs.copyFileSync(originalPath, backupPath);
      console.log(`\n💾 Backed up original galleryData.ts to galleryData.backup.ts`);
    }
    
    // Write new galleryData.ts
    fs.writeFileSync(originalPath, galleryDataContent);
    console.log(`✅ Generated new galleryData.ts with Supabase URLs`);
    
    console.log(`\n🎉 Upload complete! Your images are now served from Supabase CDN.`);
    console.log(`🌐 Public URL pattern: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/portfolio/[folder]/[image]`);
  }
}

/**
 * Test Supabase connection
 */
async function testConnection() {
  try {
    console.log('🔗 Testing Supabase connection...');
    
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
    
    const portfolioBucket = data.find(bucket => bucket.name === BUCKET_NAME);
    if (!portfolioBucket) {
      console.error(`❌ Bucket '${BUCKET_NAME}' not found. Please create it in Supabase Dashboard.`);
      console.log('   Go to Storage > Create Bucket > Name: "portfolio-images" > Public: ✅');
      return false;
    }
    
    console.log('✅ Connection successful!');
    console.log(`✅ Found bucket: ${BUCKET_NAME}`);
    return true;
    
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    return false;
  }
}

// Run the script
async function main() {
  console.log('🎨 DSMSSD Studio - Supabase Image Upload Tool\n');
  
  // Test connection first
  const connected = await testConnection();
  if (!connected) {
    process.exit(1);
  }
  
  // Start upload
  await uploadPortfolioImages();
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});

// Run the script
if (require.main === module) {
  main();
}
