const express = require("express");
var request = require("request");
var cheerio = require("cheerio");

const app = express();
const PORT = process.env.PORT || 8080;
global.site_header_data = [];

app
  .listen(PORT, () => {
    request("https://www.epochconverter.com", function(error, response, html) {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const time = $(".ecclock").text();
        // const site_header = time.text();
        site_header_data.push(time);
        console.log(time);
      }
      //https://www.epochconverter.comconsole.log(error);
      //site_header_data.push(response);
    });

    app.get("/", (req, res) => {
      res.send(site_header_data);
    });
  })
  .on("error", e => {
    console.error(`Got error : ${e.message}`);
  });
