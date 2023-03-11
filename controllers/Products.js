const Router = require("express-promise-router");
 
const db = require("../utils/db");

const router = new Router();
 
module.exports = router;


router.get("/", async (req, res) => {
  const { rows } = await db.query("SELECT * FROM products");
  res.send(rows);
  console.table(rows);
});

// create post route with id, product_name, sku, location, count
router.post("/", async (req, res) => {
  const { product_name, sku, location, count } = req.body;
  const { rows } = await db.query(
    "INSERT INTO products (product_name, sku, location, count) VALUES ($1, $2, $3, $4)",
    [product_name, sku, location, count]
  );
  res.send(rows[0]);
});