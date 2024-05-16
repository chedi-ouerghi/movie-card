import React, { useState, useEffect } from "react";
import './TopActuality.css'

const TopActuality = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
      fetch("http://localhost:5320/filtre/movies/actuality")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching top actuality movies:", error);
      });
  }, []);


  return (
    <div className="movies-container_actuality">
      {/* <h2 className="movies-title"></h2> */}
      <ul className="movies-list_actuality">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-actuality">
            <h3 className="movie-title_actuality">{movie.title}</h3>
            <p className="movie-data_actuality"><b>Director:</b> {movie.director}</p>
            <p className="movie-data_actuality"><b>Genre:</b> {movie.genre}</p>
            <p className="movie-data_actuality"><b>Duration:</b> {movie.duration} minutes</p>
                <p className="movie-data_actuality"><b>Origin:</b> {movie.origin}</p>
                <p className="movie-data_actuality"><b>Stars:</b> {movie.stars_names}</p>
            <p className="movie-data_actuality"><b>Age:</b> <span className="age-red">{movie.age}</span></p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TopActuality;
