import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '..'); // project root

const walkDir = (dir, callback) => {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (['node_modules', '.next', '.git', 'public'].includes(f)) return;
      walkDir(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
};

let filesChanged = 0;
walkDir(directoryPath, function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css') || filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    
    // Replace 196,147,63
    content = content.replace(/196,\s*147,\s*63/g, '21, 63, 101');
    content = content.replace(/196,147,63/g, '21,63,101');
    // Replace hex codes
    content = content.replace(/C4933F/gi, '153F65');
    content = content.replace(/A67828/gi, '0D2B47');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated:', filePath);
      filesChanged++;
    }
  }
});

console.log('Total files changed:', filesChanged);
