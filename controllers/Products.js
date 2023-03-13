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
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("express-promise-router");
const db = require("../utils/db");
const router = new Router();
module.exports = router;
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield db.query("SELECT * FROM products");
    res.send(rows);
    console.table(rows);
}));
// create post route with id, product_name, sku, location, count
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { product_name, sku, location, count } = req.body;
    const { rows } = yield db.query("INSERT INTO products (product_name, sku, location, count) VALUES ($1, $2, $3, $4)", [product_name, sku, location, count]);
    res.send(rows[0]);
}));
// create put route with id, product_name, sku, location, count
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { product_name, sku, location, count } = req.body;
    const { rows } = yield db.query("UPDATE products SET product_name = $1, sku = $2, location = $3, count = $4 WHERE id = $5", [product_name, sku, location, count, id]);
    res.send(rows[0]);
}));
// create delete route with id
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rows } = yield db.query("DELETE FROM products WHERE id = $1", [id]);
    res.send(rows[0]);
}));
