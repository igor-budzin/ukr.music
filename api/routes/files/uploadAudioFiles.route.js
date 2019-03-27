const multiparty = require('multiparty');
const Editor = require('id3-editor');
const mp3Duration = require('mp3-duration');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const AudioModel = require('../../models/Audio.model');
const UserModel = require('../../models/user.model');

const audioFilesPath = path.resolve(__root, '..', '..', 'files', 'audio');
const coverFilesPath = path.resolve(__root, '..', '..', 'files', 'cover');

module.exports = (router, socket) => {
  router.post('/uploadAudioFiles', (req, res, next) => {
    const form = new multiparty.Form();
    const editor = new Editor();

    let progress = 0;
    let persent = 0;
    let fileName = '';
    let currentUserLogin = '';
    let currentUserID = '';
    let durationTime = null;

    form.on('error', err => next(err));

    form.on('progress', (bytesReceived, bytesExpected) => {
      persent = Math.round((bytesReceived / bytesExpected).toFixed(2) * 100);

      if(persent !== progress && persent % 2 === 0) {
        progress = persent;
        setTimeout(() => {
          socket.emit('uploadProgress', { progress, fileName, bytesReceived });
        }, 200);
      }
    });

    form.on('field', (name, value) => {
      switch(name) {
        case 'currentUserLogin':
          currentUserLogin = value;
        break;

        case 'currentUserID':
          currentUserID = value;
        break;

        case 'fileName':
          fileName = value;
        break;
      }
    });

    form.on('file', (name, file) => {
      fs.readFile(file.path, async (err, buffer) => {
        if(err) next(err);

        // const buffer = Buffer.from(data);
        const newFileName = Date.now() + '_' + file.originalFilename.replace(/ /g, '_');

        await mp3Duration(buffer, (err, time) => {
          if(err) next(err);
          durationTime = time;
        });

        await editor.load(buffer)
          .catch(err => next(err));

        const audioID = new mongoose.Types.ObjectId();
        const coverName = editor.get('picture') ? file.originalFilename.replace('.mp3', '.jpg').replace(/ /g, '_') : null;

        const audio = new AudioModel({
          _id: audioID,
          userId: currentUserID,
          link: newFileName,
          title: editor.get('title') ? editor.get('title') : file.originalFilename.replace('.mp3', ''),
          artists: editor.get('artists') ? editor.get('artists') : 'Невідомий виконавець',
          album: editor.get('album') ? editor.get('album') : null,
          year: editor.get('year') ? editor.get('year') : null,
          genre: editor.get('genre') ? editor.get('genre') : null,
          duration: durationTime,
          picture: coverName
        });

        await fs.writeFile(path.resolve(audioFilesPath, newFileName), buffer, err => {
          if(err) next(err);
        });

        if(coverName) {
          await fs.writeFile(path.resolve(coverFilesPath, coverName), editor.get('picture').data, err => {
            if(err) next(err);
          });
        }

        await audio.save()
          .catch(err => next(err));

        await UserModel
          .findOneAndUpdate({ login: currentUserLogin }, { $push: { audio: audioID } })
          .catch(err => next(err));
      });
    });

    form.on('close', function() {
      res.send({ "status": "true" });
    });

    form.parse(req);
  });
}