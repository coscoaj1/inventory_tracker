"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.info = void 0;
const info = (...params) => {
    console.log(...params);
};
exports.info = info;
const error = (...params) => {
    console.error(...params);
};
exports.error = error;
