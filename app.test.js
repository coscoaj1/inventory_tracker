const app = require("./app");
const supertest = require("supertest");

const api = supertest(app);

describe("POST /inventory", () => {
  test("given the item name, SKU, location, and count", async () => {
    //should save the item name, id, SKU, location and count to the database
    //should return json object containing item id
    //should return status code 200
    //should specify json in content-type header
    const response = await api
      .post("/inventory")
      .send({
        item_name: "candy",
        sku: "123",
        location: "A1",
        count: 13,
      })
      .expect(200);
    //   .expect("Content-Type", /application\/json/);
  });

  test("when the item name, SKU, location and count are missing", () => {
    //should respond a status code 400
  });
});
