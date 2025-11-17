#!/usr/bin/env node

/**
 * Local Video Serving Setup
 * 
 * This script helps set up local video serving for development,
 * and provides guidance for production deployment alternatives.
 */

const fs = require('fs');
const path = require('path');

const videoFiles = [
  'mees-without-you-music-video.mp4',
  'csula-la28-marketing-reel.mp4', 
  'leigh-hideaway-music-video.mp4'
];

function checkVideoFiles() {
  console.log('🎬 Checking video files...\n');
  
  const videosDir = path.join(process.cwd(), 'public', 'videos');
  const results = [];
  
  videoFiles.forEach(filename => {
    const filePath = path.join(videosDir, filename);
    const exists = fs.existsSync(filePath);
    
    if (exists) {
      const stats = fs.statSync(filePath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`✅ ${filename} (${sizeMB}MB)`);
      results.push({ filename, sizeMB, exists: true });
    } else {
      console.log(`❌ ${filename} (missing)`);
      results.push({ filename, exists: false });
    }
  });
  
  return results;
}

function displayOptions() {
  console.log('\n🚀 Video Hosting Options:\n');
  
  console.log('1️⃣  LOCAL DEVELOPMENT (Recommended for testing)');
  console.log('   • Videos work perfectly in development (npm run dev)');
  console.log('   • No upload needed - files served directly from public/videos/');
  console.log('   • Great for testing and client previews\n');
  
  console.log('2️⃣  VERCEL BLOB (Recommended for production)');
  console.log('   • Handles large files up to 5TB');
  console.log('   • Fast global CDN delivery');
  console.log('   • Run: node scripts/upload-videos.js');
  console.log('   • Requires BLOB_READ_WRITE_TOKEN from Vercel dashboard\n');
  
  console.log('3️⃣  ALTERNATIVE CDN');
  console.log('   • Upload to any CDN (Cloudinary, AWS S3, etc.)');
  console.log('   • Update video URLs in project data');
  console.log('   • Full control over hosting\n');
  
  console.log('4️⃣  COMPRESSED VERSIONS');
  console.log('   • Compress videos to under 100MB');
  console.log('   • Deploy directly with Vercel');
  console.log('   • Faster loading but lower quality\n');
}

function main() {
  console.log('🎥 DSMSSD Studio Video Setup\n');
  console.log('============================\n');
  
  const results = checkVideoFiles();
  const existingVideos = results.filter(r => r.exists);
  
  if (existingVideos.length === 0) {
    console.log('\n⚠️  No video files found in public/videos/');
    console.log('💡 Please add your video files to public/videos/ first');
    return;
  }
  
  console.log(`\n📊 Found ${existingVideos.length}/${videoFiles.length} video files`);
  
  const totalSizeMB = existingVideos.reduce((sum, video) => sum + parseFloat(video.sizeMB), 0);
  console.log(`📁 Total size: ${totalSizeMB.toFixed(2)}MB`);
  
  if (totalSizeMB > 100) {
    console.log('⚠️  Total size exceeds Vercel\'s 100MB limit');
  }
  
  displayOptions();
  
  console.log('💡 QUICK START:');
  console.log('   1. Run "npm run dev" to test videos locally');
  console.log('   2. Visit http://localhost:3000/portfolio/4 to see video player');
  console.log('   3. Choose production hosting option above\n');
}

main();
