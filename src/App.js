import './App.css';
import React, { useState, useEffect } from "react";
import Movie from "./components/Movie";

const query = 
  '&query=';
const FEATURED_API =
  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=';
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=";

const GENRES_API =
  "https://api.themoviedb.org/3/genre/tv/list?api_key=e3f377c7d615877e2ad1bcb6fd71fdb4";

const reactKey = process.env.REACT_APP_MOVIEDB_API_KEY;

function App() {
  
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchGenre, setSearchGenre] = useState("");

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (searchTerm) { //${reactKey}${query}
      getMovies(`${SEARCH_API}${reactKey}${query}${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleOnSubmitGenre = (event) => {
    event.preventDefault();

    if (searchGenre) { //${reactKey}${query}
      getMovies(`${SEARCH_API}${reactKey}${query}${searchGenre}`);
      setSearchGenre("");
    }
  };

  const handleOnChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOnChangeGenre = (event) => {
    setSearchGenre(event.target.value);
    console.log(event);
  };

  useEffect(() => {
    getMovies(`${FEATURED_API}${reactKey}`);
  }, []);

  return (
    <>
      <header>
      <form onSubmit={handleOnSubmitGenre}>
          <input
            type="genre"
            className="genre"
            placeholder="Search Genres..."
            value={searchGenre}
            onChange={handleOnChangeGenre}
          />
        </form>
        <form onSubmit={handleOnSubmit}>
          <input
            type="search"
            className="search"
            placeholder="Search Title..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
