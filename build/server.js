"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appExpress_1 = require("./serverConfig/appExpress");
const https_1 = require("./serverConfig/https");
const http_1 = require("./serverConfig/http");
http_1.httpServer.listen(appExpress_1.httpPort);
https_1.httpsServer.listen(appExpress_1.httpsPort);
console.log('Servidor http rodando na porta : ', appExpress_1.httpPort);
console.log('Servidor https rodando na porta : ', appExpress_1.httpsPort);
