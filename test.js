"use strict";

const rdc = require("./index.js");

const rdcInstance = new rdc(1, "converter");

rdcInstance.setConverter(1);
rdcInstance.setCreeper(2, 3);

console.log(rdcInstance.toString());