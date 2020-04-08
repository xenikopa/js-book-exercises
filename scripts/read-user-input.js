"use strict";

/**
* “Создайте страницу, которая спрашивает имя у пользователя и выводит его.”
* Excerpt From: Ilya Kantor. “Язык программирования JavaScript”. Apple Books. 
*/
void function() {
    let rl = require('readline');
    let r = rl.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r.question('> What is your name? ', function(answer) {
        r.close();
        console.log('> Welcome, ' + answer);
    });
}()
