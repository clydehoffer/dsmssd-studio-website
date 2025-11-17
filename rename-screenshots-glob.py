import os
import glob
import shutil

portfolio_dir = './public/images/portfolio/4/'

print('Finding screenshot files...')

# Find all screenshot files
screenshot_files = glob.glob(os.path.join(portfolio_dir, 'Screenshot*.png'))
print(f'Found {len(screenshot_files)} screenshot files:')

for i, file_path in enumerate(sorted(screenshot_files), 1):
    print(f'  {i}: {os.path.basename(file_path)}')
    
    # Create new filename
    new_filename = f'screenshot-{i}.png'
    new_path = os.path.join(portfolio_dir, new_filename)
    
    try:
        shutil.move(file_path, new_path)
        print(f'✅ Renamed to: {new_filename}')
    except Exception as error:
        print(f'❌ Error renaming: {error}')

print('Rename complete!')
