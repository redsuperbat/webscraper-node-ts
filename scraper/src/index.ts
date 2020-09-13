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

const getWines = () => {
  const url = `https://www.systembolaget.se/api/productsearch/search/sok-dryck/?subcategory=Vitt%20vin&sortfield=Name&sortdirection=Ascending&site=all&fullassortment=1&page=${i}`;
  console.log(url);

  return axios.get(url);
};

let i = 1;

const loop = async () => {
  const response = await getWines();
  const wines: any[] = response.data.ProductSearchResults;

  wines.forEach((w) => addWineToDb(w));

  if (wines.length) {
    loop();
  }

  i++;
  await sleep(3000);
};

loop();
