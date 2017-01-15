"use strict";

const rdc = require("./index.js");

const rdcInstance = new rdc(1, "converter");

rdcInstance.setAccessCode("test");
rdcInstance.setConverter(1);
rdcInstance.setCreeper(2, 3);
rdcInstance.setField("TwitterHandle", "jadaradix")

console.log(rdcInstance.toString());

const reverseRdcInstance = new rdc(1);
reverseRdcInstance.fromString(rdcInstance.toString());
console.log(reverseRdcInstance);