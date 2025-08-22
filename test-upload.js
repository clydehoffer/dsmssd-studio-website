#!/usr/bin/env node

/**
 * Test Direct Upload to Supabase Storage
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

async function testUpload() {
  try {
    console.log('🧪 Testing direct upload to portfolio-images bucket...');
    
    // Try to upload a test file (first image we can find)
    const testImagePath = path.join(__dirname, 'public', 'images', 'portfolio', '1', 'main.jpg');
    
    if (!fs.existsSync(testImagePath)) {
      console.error('❌ Test image not found:', testImagePath);
      return;
    }
    
    console.log(`📁 Test image: ${testImagePath}`);
    
    const fileBuffer = fs.readFileSync(testImagePath);
    const testFileName = 'test-upload.jpg';
    
    console.log(`📤 Uploading test file: ${testFileName}`);
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(`test/${testFileName}`, fileBuffer, {
        contentType: 'image/jpeg',
        upsert: true
      });

    if (error) {
      console.error('❌ Upload failed:', error.message);
      console.error('❌ Error details:', error);
      
      // Check if it's a bucket not found error vs permissions
      if (error.message.includes('Bucket not found')) {
        console.log('\n💡 The bucket exists in the UI but the API can\'t find it.');
        console.log('   This usually means:');
        console.log('   1. The bucket name is different than expected');
        console.log('   2. RLS (Row Level Security) policies are blocking access');
        console.log('   3. The anon key needs storage permissions');
      }
      
      return;
    }

    console.log('✅ Upload successful!');
    console.log('📊 Upload data:', data);
    
    // Try to get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(`test/${testFileName}`);

    console.log('🌐 Public URL:', publicUrl);
    
    // Test if the URL is accessible
    console.log('\n🔗 Testing if the uploaded image is accessible...');
    console.log(`   Open this URL: ${publicUrl}`);
    
    return true;
    
  } catch (err) {
    console.error('❌ Test error:', err.message);
    console.error('❌ Full error:', err);
    return false;
  }
}

// Run the test
testUpload();
