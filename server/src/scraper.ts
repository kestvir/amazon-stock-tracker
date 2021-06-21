import puppeteer from "puppeteer";
import Product from "./product";
import { runSendMail } from "./mail";

export async function scrapeProduct(
  productURL: string,
  existingTitle?: string
) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let title: string = "";
  let inStock: boolean = true;

  await page.goto(productURL);

  const [el] = await page.$x('//*[@id="imgBlkFront"]');
  const src = await el.getProperty("src");
  const imgURL: string = await src!.jsonValue();

  if (!existingTitle) {
    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty("textContent");
    title = await txt!.jsonValue();
  }

  const [el3] = await page.$x('//*[@id="outOfStock"]');
  inStock = !el3 ? true : false;

  if (inStock) {
    const titleToSend = existingTitle ? existingTitle : title;
    runSendMail(titleToSend, productURL);
  }

  browser.close();

  return existingTitle
    ? { productURL, imgURL, inStock }
    : { productURL, imgURL, title, inStock };
}

export async function updateDB() {
  const products = await Product.find();
  if (!products.length) return;
  products.forEach(async (product) => {
    const { productURL, title, inStock, id } = product;
    const scrapedProductData = await scrapeProduct(productURL, title);
    if (scrapedProductData.inStock !== inStock)
      try {
        await Product.findByIdAndUpdate(id, {
          inStock: scrapedProductData.inStock,
        });
      } catch (error) {
        console.log(error);
      }
  });
}
