const express = require("express");
var request = require("request");
var cheerio = require("cheerio");

const app = express();
const PORT = process.env.PORT || 8080;
global.site_header_data = [];

app
  .listen(PORT, () => {
    app.get("/", (req, res) => {
      request("https://www.epochconverter.com", function(
        error,
        response,
        html
      ) {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          const time = $(".ecclock").text();
          site_header_data = time;
          //site_header_data.push(time);
          console.log(time);
        }
        //https://www.epochconverter.comconsole.log(error);
        //site_header_data.push(response);
      });

      res.send(site_header_data);
    });
  })
  .on("error", e => {
    console.error(`Got error : ${e.message}`);
  });
