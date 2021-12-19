import is_file_path from "../core/is_file_path.js";
import arguments_assert from "../foundation/arguments_assert.js";
import is_list_of from "../foundation/is_list_of.js";
import audioconcat from 'audioconcat';

export default audio_concat;
function audio_concat(files_input, file_output_name) {
    arguments_assert(arguments, is_list_of(is_file_path), is_file_path);
    return new Promise((resolve, reject) => {
        audioconcat(files_input)
            .concat(file_output_name)
            .on('start', function (command) {
            console.log('ffmpeg process started:', command)
            })
            .on('error', function (err, stdout, stderr) {
                reject({err, stdout, stderr})
            })
            .on('end', function (output) {
                resolve(output);
            });
    });
}