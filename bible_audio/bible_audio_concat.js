import audioconcat from 'audioconcat';
import directory_files_absolute from './../core/directory_files_absolute.js';

let version = 'esv';
let directory_nt = '/Users/jaredmathis/bible/audio/esv/English_English_Standard_Version____NT_Drama'

let files_nt = directory_files_absolute(directory_nt, [])

  audioconcat(files_nt)
    .concat(`${version}_nt.mp3`)
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