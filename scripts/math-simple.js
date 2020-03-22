"use strict";

 /**
  * “Чему будут равны переменные a, b, c, d, x, y в примере ниже?
  * Excerpt From: Ilya Kantor. “Язык программирования JavaScript”. Apple Books. 
  */
 (function(){
    let a = 1, b = 1;

    let c = ++a; // 1 => wrong => 2
    let d = b++; // 2 => wrong => 1
    
    let y = 2;
    
    let x = 1 + (y *= 2); // y = 4, x = 5

    console.table({a, b, c, d, y, x});
 })()