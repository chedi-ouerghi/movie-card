import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './topratedmovies.css';

const formatStarName = (name) => {
  return name.length > 30 ? name.substring(0, 30) + "..." : name;
};

const TopRatedMovies = () => {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5320/filtre/movies/top-rated");
        if (response.data) {
          setTopMovies(response.data);
        }
      } catch (error) {
        console.error("Error fetching top movies:", error);
      }
    };

    fetchTopMovies();
  }, []);

  return (
    <div className="list-top-rated">
      
      {Array.isArray(topMovies) && topMovies.map((movie) => (
        <div className="card" key={movie.id}>
          <div className="card-details">
            <div className="text-title">{movie.title}</div>
            <div>
              <strong className="text-body">Director:</strong>{" "}
              {Array.isArray(movie.director) ? movie.director.join(", ") : movie.director}
            </div>
            <div>
              <strong className="text-body">Acteurs:</strong>{" "}
              {Array.isArray(movie.stars_names)
                ? movie.stars_names.map((star) => formatStarName(star)).join(", ")
                : formatStarName(movie.stars_names)}
            </div>
            <div>
              <strong className="text-body">Description:</strong>{" "}
              {movie.description && movie.description.length > 50
                ? movie.description.substring(0, 50) + "..."
                : movie.description}
            </div>
            <p className="text-body">Rating: {movie.rating}</p>
            {movie.id && (
              <Link to={`/movie/${movie.id}`} className="card-button">
                View movie
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopRatedMovies;
