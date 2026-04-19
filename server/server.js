const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movieModel = require('./movie-model.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'files')));

/* get all movies */
app.get('/movies', function (req, res) {
  const genre = req.query.genre;
  let movies = Object.values(movieModel);

  if(genre){
    movies = movies.filter(movie => movie.Genres.includes(genre));
  }

  res.json(movies);
});

/* get one movie */
app.get('/movies/:imdbID', function (req, res) {
  const movie = movieModel[req.params.imdbID];

  if(movie){
    res.json(movie);
  }else{
    res.sendStatus(404);
  }

});

/* put movie */
app.put('/movies/:imdbID', function (req, res){
  const imdbID = req.params.imdbID;
  const exists = movieModel[imdbID];
  movieModel[imdbID] = req.body;

  if(exists){
    res.sendStatus(200);
  }else{
    res.status(201).json(req.body);
  }

});

/* new endpoint for genres */
app.get('/genres', function(req,res){
  const genres = new Set();
  Object.values(movieModel).forEach(movie => {
    movie.Genres.forEach(g => genres.add(g));
  });

  res.json(Array.from(genres).sort());
});

app.listen(3000);

console.log("Server now listening on http://localhost:3000/");
