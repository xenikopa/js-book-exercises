"use strict";
/** 
 * “Шаблонные строки, важность: 5
 * Что выведет этот скрипт?
 * let name = "Ilya"
 * alert( `hello ${1}` ); // 
 * alert( `hello ${"name"}` ); // 
 * alert( `hello ${name}` ); // ?
 * Excerpt From: Ilya Kantor. “Язык программирования JavaScript”. Apple Books. 
*/

(function() {
    let name = "Ilya";

    console.log(`hello ${1}`); //hello 1
    console.log(`hello ${name}`) //hello Ilya
    console.log(`hello ${"name"}`) //hello "name"
})()