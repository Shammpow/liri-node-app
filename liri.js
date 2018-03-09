require("dotenv").config();
var fs = require('fs');
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var input = process.argv[2]
if (input === "spotify-this-song") {



  var song = process.argv[3]

  spotify.search({ type: 'track', query: song }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
    console.log("Track Name: " + data.tracks.items[0].name);
    console.log("Link: " + data.tracks.items[0].album.external_urls.spotify);
    console.log("Album Name: " + data.tracks.items[0].album.name);



  });
  fs.appendFile("log.txt", input + " " + song + "\n", function(err, data) {
    if(err) {
      console.log(err)
    }
    console.log("Content Added!")
  })
}


if (input === "my-tweets") {


  var params = { screen_name: 'PlaceholderNam3' };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (i = 0; i < 10; i++) {
        console.log("Tweet: " + tweets[i].text)
        console.log("Created at: " + tweets[i].created_at);
        console.log("Screen Name: " + tweets[i].user.screen_name + "\n")
      }
    }
  });
  fs.appendFile("log.txt", input + "\n", function(err, data) {
    if(err) {
      console.log(err)
    }
    console.log("Content Added!")
  })

}

if (input === "movie-this") {
  var movie = process.argv[3]
  request('http://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy', function (error, body, response) {
    console.log("Title: " + JSON.parse(response).Title);
    console.log("Release Year: " + JSON.parse(response).Year);
    console.log("IMDB Rating: " + JSON.parse(response).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(response).Ratings[1].Value);
    console.log("Country Produced: " + JSON.parse(response).Country);
    console.log("Language: " + JSON.parse(response).Language);
    console.log("Plot: " + JSON.parse(response).Plot);
    console.log("Actors: " + JSON.parse(response).Actors);

  })
  fs.appendFile("log.txt", input + " " + movie + "\n", function(err, data) {
    if(err) {
      console.log(err)
    }
    console.log("Content Added!")
  })

}

if (input === "do-what-it-says") {


  fs.readFile('random.txt', "utf8", function (err, data) {
    if (err) {
      return console.log(err)
    }
    console.log(data)
  })
  fs.appendFile("log.txt", input + "\n", function(err, data) {
    if(err) {
      console.log(err)
    }
    console.log("Content Added!")
  })

}