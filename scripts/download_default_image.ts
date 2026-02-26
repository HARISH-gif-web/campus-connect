import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dest = path.join(__dirname, '../public/images/default-event.png');
const url = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000';

const file = fs.createWriteStream(dest);

https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(() => {
      console.log('Image downloaded successfully');
    });
  });
}).on('error', function(err) {
  fs.unlink(dest, () => {}); 
  console.error('Error downloading image:', err.message);
});
