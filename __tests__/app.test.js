const app = require("../app");
const supertest = require("supertest");
const path = require("path");
const api = supertest(app);
const helper = require("../utils/test_helper");
const Product = require("../models/product");

describe("POST /inventory", () => {
  test("given the item name, SKU, location, and count", async () => {
    //should upload image, save the item name, id, SKU, location and count to the database
    //should return status code 200
    const response = await api
      .post("/api/inventory")
      .attach(
        "image",
        path.resolve(__dirname, "../uploads/f5c548e946f1fa409c73a028825c4339")
      )
      .field({
        product_name: "candy",
        sku: "123",
        location: "A1",
        count: 13,
        image: "abc",
        awskey: "1",
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("response object has a product id field", async () => {
    //should return json object containing item id
    const response = await api
      .post("/api/inventory")
      .attach(
        "image",
        path.resolve(__dirname, "../uploads/f5c548e946f1fa409c73a028825c4339")
      )
      .field({
        product_name: "candy",
        sku: "123",
        location: "A1",
        count: 13,
        image:
          "https://inventory-tracker.s3.amazonaws.com/c0f69f52643f76e865e5b4cddaa297a7",
        awskey: "1",
      });
    expect(response.body.id).toBeDefined;
  });

  test("invalid product can't be added", async () => {
    const initialProducts = await Product.findAll();
    const newProduct = {
      location: "A1",
    };
    await api
      .post("/api/inventory")
      .attach(
        "image",
        path.resolve(__dirname, "../uploads/f5c548e946f1fa409c73a028825c4339")
      )
      .field(newProduct)
      .expect(401);

    const productsAtEnd = await helper.productsInDb();

    expect(productsAtEnd).toHaveLength(initialProducts.length);
  });
});

describe("GET requests", () => {
  test("products are returned as json", async () => {
    const response = await api
      .get("/api/inventory/all")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("if a user navigates to invalid page", async () => {
    const response = await api.get("/api/inventory/abcdef").expect(302);
  });
});
