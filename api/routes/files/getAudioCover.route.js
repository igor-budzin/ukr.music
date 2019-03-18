const path = require('path');
const fs = require('fs');

const coverFilesPath = path.resolve(__root, '..', '..', 'files', 'cover');

module.exports = router => {
  router.get('/getAudioCover/:link', (req, res) => {
    const filePath = path.resolve(coverFilesPath, req.params.link);
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': stat.size
    });

    const readStream = fs.createReadStream(filePath);

    readStream.pipe(res);
  });
}