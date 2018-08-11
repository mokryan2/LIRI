require("dotenv").config();
const fs = require("fs");
const Twitter = require('twitter');
const keys = require("./keys.js")
const request = require("request");
const Spotify = require("node-spotify-api");

function movie() {
    if (process.argv[3] === undefined) {
        var queryURL = "http://www.omdbapi.com/?t=Mr-Nobody&y=&plot=short&apikey=trilogy";
    }
    else {
        var movieUser = process.argv[3];
        var queryURL = "http://www.omdbapi.com/?t=" + movieUser + "&y=&plot=short&apikey=trilogy";
    };

    request(queryURL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            console.log("===================================");
            console.log(
                "Title: " + JSON.parse(body).Title +
                "\nRelease Year:" + JSON.parse(body).Released +
                "\nIMDB Rating: " + JSON.parse(body).imdbRating +
                "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].value +
                "\nCountry: " + JSON.parse(body).Country +
                "\nLanguage: " + JSON.parse(body).Language +
                "\nPlot: " + JSON.parse(body).Plot +
                "\nActors: " + JSON.parse(body).Actors);
            console.log("===================================");

        }
    });
};

switch (process.argv[2]){
    // OMDB
    case "movie-this":
        movie();
        break;
    
};