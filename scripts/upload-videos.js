#!/usr/bin/env node

/**
 * Video Upload Script for Vercel Blob
 * 
 * This script uploads large video files to Vercel Blob storage,
 * which can handle files up to 5TB without the 100MB deployment limit.
 * 
 * Usage:
 * node scripts/upload-videos.js
 */

const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

// Video files to upload
const videoFiles = [
  {
    localPath: 'public/videos/mees-without-you-music-video.mp4',
    blobPath: 'videos/mees-without-you-music-video.mp4',
    projectId: '4'
  },
  {
    localPath: 'public/videos/csula-la28-marketing-reel.mp4', 
    blobPath: 'videos/csula-la28-marketing-reel.mp4',
    projectId: '9'
  },
  {
    localPath: 'public/videos/leigh-hideaway-music-video.mp4',
    blobPath: 'videos/leigh-hideaway-music-video.mp4', 
    projectId: '10'
  }
];

async function uploadVideo(videoFile) {
  try {
    console.log(`📤 Uploading ${videoFile.localPath}...`);
    
    // Check if file exists
    if (!fs.existsSync(videoFile.localPath)) {
      console.log(`⚠️  File not found: ${videoFile.localPath}`);
      return null;
    }
    
    // Get file stats
    const stats = fs.statSync(videoFile.localPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📁 File size: ${fileSizeMB}MB`);
    
    // Read file
    const fileBuffer = fs.readFileSync(videoFile.localPath);
    
    // Upload to Vercel Blob
    const blob = await put(videoFile.blobPath, fileBuffer, {
      access: 'public',
      multipart: true // Enable multipart upload for large files
    });
    
    console.log(`✅ Uploaded successfully!`);
    console.log(`🔗 Blob URL: ${blob.url}`);
    console.log(`📋 Project ${videoFile.projectId} video ready\n`);
    
    return {
      projectId: videoFile.projectId,
      url: blob.url,
      filename: path.basename(videoFile.localPath)
    };
    
  } catch (error) {
    console.error(`❌ Error uploading ${videoFile.localPath}:`, error.message);
    return null;
  }
}

async function uploadAllVideos() {
  console.log('🎬 Starting video upload to Vercel Blob...\n');
  
  // Check for required environment variable
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error('❌ Missing BLOB_READ_WRITE_TOKEN environment variable');
    console.log('💡 Get your token from: https://vercel.com/dashboard/stores');
    console.log('💡 Then run: export BLOB_READ_WRITE_TOKEN=your_token_here');
    process.exit(1);
  }
  
  const results = [];
  
  // Upload each video
  for (const videoFile of videoFiles) {
    const result = await uploadVideo(videoFile);
    if (result) {
      results.push(result);
    }
  }
  
  // Display summary
  console.log('📊 Upload Summary:');
  console.log('==================');
  
  if (results.length === 0) {
    console.log('❌ No videos were uploaded successfully');
    return;
  }
  
  results.forEach(result => {
    console.log(`✅ Project ${result.projectId}: ${result.filename}`);
    console.log(`   URL: ${result.url}\n`);
  });
  
  console.log('🎉 All uploads complete!');
  console.log('💡 Next: Update your project data with these URLs');
}

// Run the upload
uploadAllVideos().catch(console.error);
