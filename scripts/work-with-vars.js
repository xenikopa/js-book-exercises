"use strict";

/**
 * Работа с переменными, важность: 2
 * Объявите две переменные: admin и name.
 * Запишите строку "Джон" в переменную name.
 * Скопируйте значение из переменной name в admin.
 * Выведите на экран значение admin, используя функцию alert (должна показать «Джон»).”
 * Excerpt From: Ilya Kantor. “Язык программирования JavaScript”. Apple Books. 
 */

void function() {
    let admin;
    let name;

    name = 'John';
    admin = name;

    console.log(admin);
}()
