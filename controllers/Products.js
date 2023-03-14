"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const sharp_1 = __importDefault(require("sharp"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const storage = require("../upload-config");
const upload = (0, multer_1.default)(storage);
const { uploadFile, deleteFile } = require("../utils/s3");
const db_1 = __importDefault(require("../utils/db"));
exports.router = (0, express_promise_router_1.default)();
exports.router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db_1.default.query("SELECT * FROM products", []);
    res.send(rows);
    console.table(rows);
}));
exports.router.post("/", upload.single("image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.file;
    console.log(key);
    const dateNow = `./uploads/${Date.now()}-resized.jpg`;
    const image = yield (0, sharp_1.default)(req.file.path).resize(50, 50);
    yield image.toFile(dateNow);
    console.log(dateNow);
    const result = yield uploadFile(dateNow, key);
    console.log(result);
    fs_1.default.unlinkSync(req.file.path);
    fs_1.default.unlinkSync(dateNow);
    const { product_name, sku, location, count } = req.body;
    const { rows } = yield db_1.default.query("INSERT INTO products (product_name, sku, location, count) VALUES ($1, $2, $3, $4)", [product_name, sku, location, count]);
    res.send(rows[0]);
}));
exports.router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { product_name, sku, location, count } = req.body;
    const { rows } = yield db_1.default.query("UPDATE products SET product_name = $1, sku = $2, location = $3, count = $4 WHERE id = $5", [product_name, sku, location, count, id]);
    res.send(rows[0]);
}));
exports.router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rows } = yield db_1.default.query("DELETE FROM products WHERE id = $1", [id]);
    res.send(rows[0]);
}));
exports.router.get("/error", (req, res) => {
    res.send("The URL you are trying to reach does not exist.");
});
exports.default = { router: exports.router };
