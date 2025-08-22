#!/usr/bin/env node

/**
 * Debug Supabase Connection
 */

const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const SUPABASE_URL = 'https://lwurlldzyvkljifljjfo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3dXJsbGR6eXZrbGppZmxqamZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MzIxNzgsImV4cCI6MjA3MTQwODE3OH0.tJL6M9xFLIYPIleJYONtUketf5nyTfEgQVwrQAIvzZQ';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function debugConnection() {
  try {
    console.log('🔗 Testing Supabase connection...');
    console.log(`📡 URL: ${SUPABASE_URL}`);
    console.log(`🔑 Key: ${SUPABASE_KEY.substring(0, 20)}...`);
    
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      console.error('❌ Error details:', error);
      return false;
    }
    
    console.log('✅ Connection successful!');
    console.log(`📦 Found ${data.length} buckets:`);
    
    data.forEach((bucket, index) => {
      console.log(`   ${index + 1}. Name: "${bucket.name}" | Public: ${bucket.public} | Created: ${bucket.created_at}`);
    });
    
    // Try to find our bucket
    const portfolioBucket = data.find(bucket => bucket.name === 'portfolio-images');
    if (portfolioBucket) {
      console.log(`✅ Found portfolio-images bucket!`);
      console.log(`   Public: ${portfolioBucket.public}`);
      console.log(`   ID: ${portfolioBucket.id}`);
    } else {
      console.log(`❌ portfolio-images bucket not found`);
      console.log(`   Available buckets: ${data.map(b => b.name).join(', ')}`);
    }
    
    return true;
    
  } catch (err) {
    console.error('❌ Connection error:', err.message);
    console.error('❌ Full error:', err);
    return false;
  }
}

// Run the debug
debugConnection();
