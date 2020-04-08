"use strict";

const path = require('path');
const fs = require('fs');
const scriptsDir = path.join(__dirname, 'scripts');
const readline = require('readline');
const color = require('./scripts/helpers/getColor');


void function(){
    let messageEmptyDir = () => {
        console.log(color('red'), 'Sorry, there are no scripts in "scripts" directory.')
        console.log(color('cyan'), 'Change it and create first script on javascript in "scripts" dir!');
    }

    fs.readdir(scriptsDir, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        let jsFiles = files.filter(x => new RegExp(/\.js/g).test(x));

        if (jsFiles.length === 0) {
            messageEmptyDir();
        } else {
            console.log(color('purple'), '> Choose script to run:');

            jsFiles.forEach((file, index) => {
                console.log(color('cyan'), `[${index}]: ${file}`); 
            });
            console.log(color('red'), `[!]: exit`)

            execScript(jsFiles);
        }
    });
}();

/**
 * Execute choosen script
 * @param {Array<string>} files 
 */
let execScript = (files) => {
    let tryAgain = () => {
        rl.question('Wrong index. Do you want to try again? Y/n ', (answer) => {
            switch (answer.toLowerCase()) {
                case 'n': {
                    rl.close();
                    break;
                }
                default: {
                    chooseScript();
                    break;
                }
            }
        })
    }

    let chooseScript = () => {
        let isValidIndex = (index) => index <= files.length && index > -1;
        let tryExecute = (fileName) => {
            try {
                require(`${__dirname}/scripts/${fileName}`)
            } catch (err) {
                console.log(color('red'), err.message);
            }
        }

        rl.question('What do you want to exec? Write index of script: ', (answer) => {
            if (answer === '!') {
                rl.close();
                return;
            }
            if (isValidIndex(answer)) {
                rl.close();
                tryExecute(files[answer]);
            } else {
                tryAgain();
            }
        });
    }
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
      
    chooseScript();
}
