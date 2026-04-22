function appendMovie(movie){
  const main = document.querySelector("main");
  const article = new ArticleBuilder()
  .setId(movie.imdbID)
  .appendChild(
  new HeadingBuilder(2)
  .setText(movie.Title)
  .build()
  )
  
  .appendChild(
  new ImageBuilder()
  .setSource(movie.Poster)
  .build()
  )
  
  .appendChild(
  new ParagraphBuilder()
  .setText("Released: " + movie.Released)
  .build()
  )
  
  .appendChild(
  new ParagraphBuilder()
  .setText("Runtime: " + movie.Runtime + " min")
  .build()
  )
  
  .appendChild(
  buildGenreSpans(movie.Genres)
  )
  
  .appendChild(
  buildList("Directors", movie.Directors)
  )
  
  .appendChild(
  buildList("Writers", movie.Writers)
  )
  
  .appendChild(
  buildList("Actors", movie.Actors)
  )
  
  .appendChild(
  new ParagraphBuilder()
  .setText(movie.Plot)
  .build()
  )
  
  .appendChild(
  new ParagraphBuilder()
  .setText("Metascore: " + movie.Metascore)
  .build()
  )
  
  .appendChild(
  new ParagraphBuilder()
  .setText("IMDB Rating: " + movie.imdbRating)
  .build()
  )
  
  .appendChild(
  new ButtonBuilder()
  .setText("Edit")
  .onClick(function(){
  location.href = "edit.html?imdbID=" + movie.imdbID;
  })
  .build()

  )
  
  .build();
  
  main.appendChild(article);
  
}
  
function buildGenreSpans(genres){
  const p = new ParagraphBuilder();

  genres.forEach(g => {
  p.appendChild(
  new SpanBuilder()
  .addClass("genre")
  .setText(g)
  .build()
  );
  
  });
  
  return p.build();
  
}
  
function buildList(title,data){
  const container = document.createElement("div");

  const h3 = document.createElement("h3");
  h3.textContent = title;
  container.appendChild(h3);

  const ul = document.createElement("ul");
  data.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  ul.appendChild(li);
  });
  
  container.appendChild(ul);
  return container;
}
  
function loadMovies(genre){
  const params = new URLSearchParams();

  if(genre){
  params.set("genre", genre);
  }
  
  const xhr = new XMLHttpRequest();
  xhr.open("GET","/movies?" + params.toString());
  xhr.onload = function(){
  
  const main = document.querySelector("main");
  main.innerHTML = "";
  JSON.parse(xhr.responseText).forEach(appendMovie);
  
  };
  xhr.send();
  
}
  
window.onload = function(){
  const nav = document.querySelector("nav");
  
  const navTitle = document.createElement("h2");  
  navTitle.textContent = "Genres";
  nav.appendChild(navTitle);

  const xhr = new XMLHttpRequest();
  xhr.open("GET","/genres");
  xhr.onload = function(){
  const genres = JSON.parse(xhr.responseText);

  const allButton = new ButtonBuilder()
  .setText("All")
  .onClick(function(){
    loadMovies();
  })
  .build();
nav.appendChild(allButton);

genres.forEach(g => {

  const btn = new ButtonBuilder()
    .setText(g)
    .onClick(function(){
      loadMovies(g);
    })
    .build();

  nav.appendChild(btn);

});
  
  nav.querySelector("button").click();
  };
  
  xhr.send();
  
}