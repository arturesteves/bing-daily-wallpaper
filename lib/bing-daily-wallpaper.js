#! /usr/bin/env node
/**
 * This file is part of the <bing-daily-wallpaper> project.
 *
 * @author <artur-esteves>
 * @copyright (c)
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

"use strict";

/////////////////////////////////////////////////////
//// imports
/////////////////////////////////////////////////////
const request = require("request-promise");
const image_downloader = require("image-downloader");
const wallpaper = require("wallpaper");
const config = require("../config.json");


/////////////////////////////////////////////////////
//// logic
/////////////////////////////////////////////////////

const format = config.format == "json" ? "js" : config.format;
let url = config.base_url + "/HPImageArchive.aspx?format=" + format + "&idx=0&n=1&mkt=" + config.region;
let options = {
    uri: url,
    headers: {
        "User-Agent": "Request-Promise"
    },
    json: config.format == "json"
};

console.log("fetching...");
// fetch wallpaper data
request(options)
    .then(function(response) {
        // check response attributes
        let imagePath = response.images[0].url;
        let imageUrl = config.base_url + imagePath;

        // download image
        image_downloader.image({url: imageUrl, dest: config.save_directory})
            .then(({ filename, image }) => {
                console.log("File saved to", filename);

                // update wallpaper
                wallpaper.set(filename)
                    .then(function() {
                        console.log("wallpaper updated!");
                    })
                    .catch(function() {
                        console.log("failed to set wallpaper");
                        new Error("failed to set wallpaper");
                    });
                }).catch((err) => {
                console.log(err);
                new Error(err);
            })
        })
    .catch(function(error) {
        console.log(error);
        new Error(error);
    });
