"use strict";

const path = require('path');
const fs = require('fs');
const scriptsDir = path.join(__dirname, 'scripts');
const readline = require('readline');

const colorCyan = "\x1b[36m%s\x1b[0m";
const colorPurple = "\x1b[35m%s\x1b[0m";
const colorRed = "\x1b[31m%s\x1b[0m";

(function(){
    let messageEmptyDir = () => {
        console.log(colorRed, 'Sorry, there are no scripts in "scripts" directory.')
        console.log(colorCyan, 'Change it and create first script on javascript in "scripts" dir!');
    }

    fs.readdir(scriptsDir, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 

        let jsFiles = files.filter(x => new RegExp(/\.js/g).test(x));

        if (jsFiles.length === 0) {
            messageEmptyDir();
        } else {
            console.log(colorPurple, '> Choose script to run:');

            jsFiles.forEach((file, index) => {
                console.log(colorCyan, `[${index}]: ${file}`); 
            });

            execScript(jsFiles);
        }
    });
})();

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
                console.log(colorRed, err);
            }
        }

        rl.question('What do you want to exec? Write index of script: ', (answer) => {
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
