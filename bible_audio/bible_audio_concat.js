import directory_files_absolute from './../core/directory_files_absolute.js';
import directory_files from './../core/directory_files.js';
import for_each from './../foundation/for_each.js';
import for_each_async from './../core/for_each_async.js';
import string_replace_all from './../foundation/string_replace_all.js';
import file_path_parse from './../core/file_path_parse.js'
import has_property from '../foundation/has_property.js';
import keys from '../foundation/keys.js';
import audio_concat from './audio_concat.js';

let version = 'esv';
let directory_path = `/Users/jaredmathis/bible/audio/esv`;

let books = {};
let files = directory_files_absolute(directory_path, [])
for_each(files, f => {
    if (!f.endsWith(".mp3")) {
        return;
    }
    let parsed = file_path_parse(f);
    let book_with_underscores = parsed.file_name.substring(9, 9 + 12);
    let book = string_replace_all(book_with_underscores, '_', '');
    if (!has_property(books, book)) {
        books[book] = [];
    }
    books[book].push(f);
})

for_each_async(keys(books), async book => {
    let chapters = books[book];
    audio_concat(chapters, `${version}_${book}.mp3`)
})

