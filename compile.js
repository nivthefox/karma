#!/usr/bin/env node
var sass = require('node-sass');
var fs = require('fs');

sass.render({
    includePaths: ['scss/'],
    imagePath: '/img',
    ouputStyle: 'compressed',
    file: 'scss/screen.scss',
    success: function (data) {
        fs.readFile('public/css/screen.css', function (err, current) {
            if (data != current) {
                fs.writeFile('public/css/screen.css', data, function (err) {
                    console.log('%d lines saved.', data.split('\n').length);
                });
            }
            else {
                console.log('No change.');
            }
        });
    },
    error: console.error
});