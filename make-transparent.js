const Jimp = require('jimp');

Jimp.read('https://hexafalls.org/logos/main_logo.png')
  .then(img => {
    img.scan(0, 0, img.bitmap.width, img.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      // Make pure white or very close to white transparent
      if (r > 230 && g > 230 && b > 230) {
        this.bitmap.data[idx + 3] = 0;
      }
    });
    // Resize to a smaller dimension so the file isn't 2.2MB!
    img.resize(256, Jimp.AUTO);
    return img.writeAsync('public/main_logo_transparent.png');
  })
  .then(() => console.log('Successfully made logo transparent and compressed!'))
  .catch(err => {
    console.error('Error processing image:', err);
    process.exit(1);
  });
