import directory_files_absolute from './../core/directory_files_absolute.js';
import directory_files from './../core/directory_files.js';
import for_each from './../foundation/for_each.js';
import for_each_async from './../core/for_each_async.js';
import string_replace_all from './../foundation/string_replace_all.js';
import file_path_parse from './../core/file_path_parse.js'
import has_property from '../foundation/has_property.js';
import keys from '../foundation/keys.js';
import audio_concat from './audio_concat.js';
import is_file_path from '../core/is_file_path.js';

let version = 'esv';
let directory_path = `/Users/jaredmathis/bible/audio/esv`;
let generate_books = false;

let books = {};
let files = directory_files_absolute(directory_path, [])

let groups = []
groups.push({
    name: 'epistles',
    first: 'B06'
});

for_each(groups, g => {
    g.files = [];
    let first_seen = false;
    for_each_mp3(files, (f, parsed) => {
        if (parsed.file_name.startsWith(g.first)) {
            first_seen = true;
        }
        if (first_seen) {
            g.files.push(f);
        }
    })
})
function for_each_mp3(files, lambda) {
    for_each(files, f => {
        if (!f.endsWith(".mp3")) {
            return;
        }
        let parsed = file_path_parse(f);
        lambda(f, parsed);
    })
}

for_each_mp3(files, (f, parsed) => {
    let book_with_underscores = parsed.file_name.substring(9, 9 + 12);
    let book = string_replace_all(book_with_underscores, '_', '');
    if (!has_property(books, book)) {
        books[book] = [];
    }
    books[book].push(f);
})

if (generate_books) {
    for_each(keys(books), book => {
        let chapters = books[book];
        audio_concat(chapters, `books/${version}_${book}.mp3`)
    })
}

let group_name = 'epistles';
let epistles = groups.filter(g => g.name === group_name)[0]
audio_concat(epistles.files, `${version}_${group_name}.mp3`)
