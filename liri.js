require("dotenv").config();
const fs = require("fs");
const Twitter = require('twitter');
const keys = require("./keys.js")
const request = require("request");
const Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

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

        };
    });
};

function spotifyThis() {
    query = "";
    if (process.argv[3] === undefined) {
        query = "The Sign";
    }
    else {
        query = process.argv[3];
    }
    spotify.search({ type: 'track', query: query, limit: 1 }, (err, data) => {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        else {
            console.log("=================================================================");
            console.log(
                "Artist's Name: " + data.tracks.items[0].album.artists[0].name +
                "\nAlbum Name: " + data.tracks.items[0].album.name +
                "\nSong Name: " + data.tracks.items[0].name +
                "\nSong Url: " + data.tracks.items[0].external_urls.spotify);
            console.log("=================================================================");
        };
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) {
            throw error;
        }
        else {
            spotify.search({ type: 'track', query: data, limit: 1 }, (err, data) => {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                else {
                    console.log("=================================================================");
                    console.log(
                        "Artist's Name: " + data.tracks.items[0].album.artists[0].name +
                        "\nAlbum Name: " + data.tracks.items[0].album.name +
                        "\nSong Name: " + data.tracks.items[0].name +
                        "\nSong Url: " + data.tracks.items[0].external_urls.spotify);
                    console.log("=================================================================");
                };
            });
        };
    });
};

switch (process.argv[2]) {
    // OMDB
    case "movie-this":
        movie();
        break;
    //Spotify
    case "spotify-this-song":
        spotifyThis();
        break;
    //DWIS
    case "do-what-it-says":
        doWhatItSays();
        break;
};

// BONUS
fs.appendFile("log.txt", "\n" + process.argv[2] + " Looked up: " + process.argv[3]), (err) => {
    if (err)
        throw error;
    console.log("Action has been logged!")
};