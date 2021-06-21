import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "./cron";
import { scrapeProduct } from "./scraper";
import Product from "./product";

dotenv.config();

const app = express();

const port = 9000;

app.use(express.json());

app.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.log(error);
  }
});

app.post("/products", async (req, res, next) => {
  const { productURL } = req.body;
  const productDataObj = await scrapeProduct(productURL);
  const product = new Product({ ...productDataObj });
  try {
    await product.save();
    res.send({});
  } catch (error) {
    console.log(error);
  }
});

app.put("/products/:id", async (req, res, next) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.send({});
  } catch (error) {
    console.log(error);
  }
});

app.delete("/products/:id", async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({});
  } catch (error) {
    console.log(error);
  }
});

mongoose.connect(
  `${process.env.MDB_CONNECT}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);
app.listen(port, () => console.log(`Listening on port ${port}!`));
