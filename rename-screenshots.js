const fs = require('fs');
const path = require('path');

const portfolioDir = './public/images/portfolio/4/';

// Mapping of old names to new names
const renameMap = {
  'Screenshot 2025-06-08 at 12.36.23 AM.png': 'screenshot-1.png',
  'Screenshot 2025-06-08 at 12.36.38 AM.png': 'screenshot-2.png',
  'Screenshot 2025-06-08 at 12.36.56 AM.png': 'screenshot-3.png',
  'Screenshot 2025-06-08 at 12.37.32 AM.png': 'screenshot-4.png',
  'Screenshot 2025-06-08 at 12.37.42 AM.png': 'screenshot-5.png',
  'Screenshot 2025-06-08 at 12.37.53 AM.png': 'screenshot-6.png',
  'Screenshot 2025-06-08 at 12.38.01 AM.png': 'screenshot-7.png',
  'Screenshot 2025-06-08 at 12.38.19 AM.png': 'screenshot-8.png',
  'Screenshot 2025-06-08 at 12.38.29 AM.png': 'screenshot-9.png'
};

console.log('Renaming screenshot files...');

Object.entries(renameMap).forEach(([oldName, newName]) => {
  const oldPath = path.join(portfolioDir, oldName);
  const newPath = path.join(portfolioDir, newName);
  
  try {
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`✅ Renamed: ${oldName} → ${newName}`);
    } else {
      console.log(`❌ File not found: ${oldName}`);
    }
  } catch (error) {
    console.error(`❌ Error renaming ${oldName}:`, error.message);
  }
});

console.log('Rename complete!');
