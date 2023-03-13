"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PG_DATABASE = exports.PG_PASSWORD = exports.PG_USER = exports.PORT = exports.PG_PORT = exports.PG_HOST = exports.SECRET_ACCESS_KEY = exports.ACCESS_KEY_ID = exports.REGION = exports.BUCKET_NAME = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const PORT = process.env.PORT;
exports.PORT = PORT;
const PG_HOST = process.env.PG_HOST;
exports.PG_HOST = PG_HOST;
const PG_PORT = process.env.PG_PORT;
exports.PG_PORT = PG_PORT;
const PG_USER = process.env.PG_USER;
exports.PG_USER = PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;
exports.PG_PASSWORD = PG_PASSWORD;
const PG_DATABASE = process.env.PG_DATABASE;
exports.PG_DATABASE = PG_DATABASE;
const BUCKET_NAME = process.env.BUCKET_NAME;
exports.BUCKET_NAME = BUCKET_NAME;
const REGION = process.env.BUCKET_REGION;
exports.REGION = REGION;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
exports.ACCESS_KEY_ID = ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
exports.SECRET_ACCESS_KEY = SECRET_ACCESS_KEY;
