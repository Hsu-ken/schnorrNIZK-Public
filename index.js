import express from 'express';
var app = express();
import { schnorrMain, schnorrPK, schnorrSecp256test } from "./src/zkp_js/schnorrMain.js"


let dataSet = "kevin9999999"

var args = process.argv.slice(2);



if (!args.length) {

    console.log(schnorrPK(dataSet))
} else if (args[0] == "PK") {
    dataSet = args[1].toString()
    console.log(schnorrPK(dataSet))
} else if (args[0] == "input") {
    dataSet = args[1].toString()

    schnorrMain(dataSet)
}