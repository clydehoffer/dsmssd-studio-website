import os
import shutil

portfolio_dir = './public/images/portfolio/4/'

# Mapping of old names to new names
rename_map = {
    'Screenshot 2025-06-08 at 12.36.23 AM.png': 'screenshot-1.png',
    'Screenshot 2025-06-08 at 12.36.38 AM.png': 'screenshot-2.png',
    'Screenshot 2025-06-08 at 12.36.56 AM.png': 'screenshot-3.png',
    'Screenshot 2025-06-08 at 12.37.32 AM.png': 'screenshot-4.png',
    'Screenshot 2025-06-08 at 12.37.42 AM.png': 'screenshot-5.png',
    'Screenshot 2025-06-08 at 12.37.53 AM.png': 'screenshot-6.png',
    'Screenshot 2025-06-08 at 12.38.01 AM.png': 'screenshot-7.png',
    'Screenshot 2025-06-08 at 12.38.19 AM.png': 'screenshot-8.png',
    'Screenshot 2025-06-08 at 12.38.29 AM.png': 'screenshot-9.png'
}

print('Renaming screenshot files...')

for old_name, new_name in rename_map.items():
    old_path = os.path.join(portfolio_dir, old_name)
    new_path = os.path.join(portfolio_dir, new_name)
    
    try:
        if os.path.exists(old_path):
            shutil.move(old_path, new_path)
            print(f'✅ Renamed: {old_name} → {new_name}')
        else:
            print(f'❌ File not found: {old_path}')
    except Exception as error:
        print(f'❌ Error renaming {old_name}: {error}')

print('Rename complete!')
