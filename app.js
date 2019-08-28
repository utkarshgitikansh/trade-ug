const express = require("express");
var request = require("request");
var cheerio = require("cheerio");

const app = express();
global.site_header_data = [];

app
  .listen(8000, () => {
    request("https://time.is", function(error, response, html) {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const time = $(".leaps.leap0").text();
        // const site_header = time.text();
        // site_header_data.push(site_header);
        console.log(time);
      }
      //console.log(response);
      //site_header_data.push(response);
    });

    app.get("/", (req, res) => {
      //res.send(site_header_data);
    });
  })
  .on("error", e => {
    console.error(`Got error : ${e.message}`);
  });
