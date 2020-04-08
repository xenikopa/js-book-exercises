"use strict";

const http = require('http');
const fs = require('fs');
const pipe = require('./helpers/pipe');
const color = require('./helpers/getColor');

/**
 * 
 * @param {function} callback 
 * @param {number} port 
 */
let createServer = (callback) => (port) => http
    .createServer(callback)
    .on('error', (err) => console.log(color('red'), `Error! ${err}`))
    .on('listening', () => {
        console.log(`Listening on ${port}`);
        console.log(`Click to open to link http://localhost:${port}`)
    });

/**
 * 
 * @param {http responce} response 
 */
let getStream = response => filename => fs
    .createReadStream(`./${filename}`)
    .on('error', () => {
        console.log(color('red'), "Error! Can't read file 'index.html'. Check, that file is exists & correct.");
        response.end();
    });

let serverCallback = (filename) => (request, response) => getStream(response)(filename).pipe(response);

let showHelp = () => void console.log(`
Welcome to server.js script! This script run the server.

You can use agruments: 

--port - to set port for server. 
    Default value: 8080. 
    Example: --port 3000.

--file - to set file name for start page. 
    Default value: index.html. 
    Example: --file start.html
`);

/**
 * 
 * @param {process.argv} agrv 
 */
let getPort = (agrv) => pipe(
    agrv => agrv.findIndex(x => x === '--port'),
    index => index === -1 ? null : Number(agrv[index + 1]),
    index => {
        if (isNaN(index)){
            console.error(color('red'), 'Index must be a Number.  For more information use --help');
            process.exit(1);
        }
        return index || 3000;
    }
)(agrv);

/**
 * 
 * @param {process.argv} agrv 
 */
let getFile = (argv) => pipe(
    argv => argv.findIndex(x => x === '--file'),
    index => index === -1 ? null : argv[index + 1],
    filename => {
        if (filename != null && !new RegExp(/\.html/g).test(filename)) {
            console.error(color('red'), 'Needs `html` file. For more information use --help.');
            process.exit(1);
        }
        return filename || 'index.html'
    }
)(argv);

let getHelp = (argv) => pipe(
    argv => argv.findIndex(x => x === '--help'),
    index => {
        if (index === -1) { return; }
        showHelp();
        process.exit(0);
    }
)(argv);

void function() {
    let agrv = process.argv.slice(2);
    getHelp(agrv);
    let port = getPort(agrv);
    createServer(serverCallback(getFile(agrv)))(port).listen(port)
}()
