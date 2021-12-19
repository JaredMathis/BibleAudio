import audioconcat from 'audioconcat';
import directory_files_absolute from './../core/directory_files_absolute.js';

let version = 'esv';
let testament = 'ot';
let directory_path = `/Users/jaredmathis/bible/audio/esv/English_English_Standard_Version____${testament.toUpperCase()}_Drama`;

let files = directory_files_absolute(directory_path, [])

  audioconcat(files)
    .concat(`${version}_${testament}.mp3`)
    .on('start', function (command) {
      console.log('ffmpeg process started:', command)
    })
    .on('error', function (err, stdout, stderr) {
      console.error('Error:', err)
      console.error('ffmpeg stderr:', stderr)
    })
    .on('end', function (output) {
      console.error('Audio created in:', output)
    })