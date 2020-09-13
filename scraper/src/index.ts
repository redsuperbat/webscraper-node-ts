import axios from "axios";
import mysql from "mysql";
import { sleep } from "./sleep";

const conn = mysql.createConnection({
  host: "db",
  database: "bolaget",
  user: "root",
  password: "gungstol123",
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Connected to mysqldb...");
});

const addWineToDb = (wine: any) => {
  const sql = `
    INSERT INTO
        wines (
          product_id, 
          category, 
          sub_category, 
          image_url, 
          country, 
          volume, 
          price, 
          vintage, 
          wine_type, 
          short_desc, 
          taste_desc, 
          taste_usage_desc, 
          product_url
          ) 
    VALUES 
        (
          ${wine.ProductId}, 
          '${wine.Category}', 
          '${wine.SubCategory}',
          '${wine.ProductImage.ImageUrl}',
          '${wine.Country}',
          ${wine.Volume},
          ${wine.Price},
          ${wine.Vintage},
          '${wine.Type}',
          '${wine.BeverageDescriptionShort}',
          '${wine.Taste}',
          '${wine.Usage}',
          'https://systembolaget.se${wine.ProductUrl}'
        );`;

  conn.query(sql, (res) => {
    console.log(res);
  });
};

const categories: string[] = ["R%C3%B6tt%20vin", "Vitt%20vin"];
let currentCategory = 0;

const getWines = () => {
  const url = `https://www.systembolaget.se/api/productsearch/search/sok-dryck/?subcategory=${categories[currentCategory]}&sortdirection=Ascending&page=${i}`;
  console.log(url);

  return axios.get(url);
};

let i = 1;

const loop = async () => {
  const response = await getWines();
  const wines: any[] = response.data.ProductSearchResults;

  wines.forEach((w) => addWineToDb(w));

  if (!wines.length) {
    currentCategory++;
    i = 0;
  }

  i++;
  await sleep(5000);
  if (currentCategory < 2) {
    loop();
  }
};

loop();
