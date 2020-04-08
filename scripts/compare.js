"use strict";

/**
 * “Каким будет результат этих выражений?”
 * Excerpt From: Ilya Kantor. “Язык программирования JavaScript”. Apple Books. 
 */
void function(){
    console.log(5 > 4); //true
    console.log("ананас" > "яблоко");  //false
    console.log("2" > "12");  //false => wrong => true
    console.log(undefined == null);  //true
    console.log(undefined === null); //false
    console.log(null == "\n0\n");  //false
    console.log(null === +"\n0\n"); //false
}()