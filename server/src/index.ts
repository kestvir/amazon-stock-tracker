import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { v4 as uuidv4 } from "uuid";
import db from "./db";
import "./cron";
import { scrapeProduct } from "./scraper";
import { Product } from "./types";

const app = express();

const port = 9000;

app.use(express.json());

app.get("/products", async (req, res, next) => {
  res.send(db.data?.products);
});

app.post("/products", async (req, res, next) => {
  const { productURL } = req.body;
  const productObj = await scrapeProduct(productURL);
  db.data!.products.push({
    ...productObj,
    id: uuidv4(),
  } as Product);
  db.write();
  res.send({});
});

app.put("/products/:id", async (req, res, next) => {
  const updatedProductsArr = [...db.data!.products];
  const productToUpdateIndex = updatedProductsArr.findIndex((product) => {
    return product.id === req.params.id;
  });
  updatedProductsArr[productToUpdateIndex] = {
    ...updatedProductsArr[productToUpdateIndex],
    ...req.body,
  };
  db.data!.products = updatedProductsArr;
  db.write();
  res.send({});
});

app.delete("/products/:id", (req, res, next) => {
  const filteredProducts = db.data!.products.filter((product) => {
    return product.id !== req.params.id;
  });
  db.data!.products = filteredProducts;
  db.write();
  res.send({});
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
