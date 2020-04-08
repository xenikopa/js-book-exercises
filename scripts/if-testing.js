"use strict";

/**
 * function for show question and get result from terminal
 * @param {string} question 
 * @param {function} callback 
 */
let ask = function(question, callback) {
    let rl = require('readline');
    let r = rl.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        r.question(`${question} `, (answer) => {
            r.close();
            resolve(callback(answer));
        });
    })
};

/**
 * Используя конструкцию if..else, напишите код, который будет спрашивать: „Какое «официальное» название JavaScript?"
 * Если пользователь вводит «ECMAScript», то показать: «Верно!», в противном случае – отобразить: «Не знаете? ECMAScript!”
 * Excerpt From: Ilya Kantor. “Язык программирования JavaScript”. Apple Books. 
 * 
 * @param {string} answer 
 */
let validateJsName = function(answer) {
    if (answer == 'ECMAScript') {
        return 'Верно!';
    } else {
        return 'Не знаете? ECMAScript!'
    }
};

/**
 * “Используя конструкцию if..else, напишите код, который получает число через prompt, а затем выводит в alert:
 * 1, если значение больше нуля,
 * -1, если значение меньше нуля,
 * 0, если значение равно нулю.”
 * Excerpt From: Ilya Kantor. “Язык программирования JavaScript”. Apple Books. 
 * 
 * @param {number} number 
 */
let getNumberSign = function(number) {
    if (number == 0) {
        return 0;
    } else if (number > 0) {
        return 1;
    } else {
        return -1;
    }
};

/**
 * 
 * “Перепишите if с использованием условного оператора '?':
 * let result;
 * if (a + b < 4) {
 *  result = 'Мало'
 * } else {
 * result = 'Много'
 * }
 * 
 * “let message;
 * if (login == 'Сотрудник') 
 *   message = 'Привет'
 * } else if (login == 'Директор') 
 *   message = 'Здравствуйте'
 * } else if (login == '') 
 *   message = 'Нет логина'
 * } else 
 *   message = ''
 * }”
 */
let rewriteFunctions = function() {
    let a, b;
    let result = (a + b < 4) ? 'Мало' : 'Много'

    let login = '';
    let message = login == 'Сотрудник'
        ? 'Привет'
        : login == 'Директор' 
            ? 'Здравствуйте'
            : login.length === 0
                ? 'Нет логина'
                : '';

    //or
    let logins = ['Сотрудник', 'Директор']
    let messageV2 = login.length === 0
        ? 'Нет логина'
        : logins.includes(login) 
            ? login == 'Сотрудник' ? 'Привет' : 'Здравствуйте'
            : '';
};


void function(){
    ask('Какое «официальное» название JavaScript?', validateJsName)
        .then(x => console.log(x))
        .then(() => ask('Write any number', getNumberSign))
        .then(x => console.log(x))
}();
