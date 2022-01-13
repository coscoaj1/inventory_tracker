const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const Product = sequelize.define("products", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  product_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sku: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  count: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Product;
