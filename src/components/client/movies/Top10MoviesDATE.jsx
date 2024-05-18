import React, { useEffect, useState } from "react";
import axios from "axios";

const Top10MoviesDATE = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5320/filtre/top-rated");
        setTopRatedMovies(response.data);
        console.log(response.data,'top rated movies');
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
      }
    };
    fetchTopRatedMovies();
  }, []);

  return (
    <div className="top_10_last_movies">
      <h2>Top Rated Movies</h2>
      <ul>
        {topRatedMovies.map((movie) => (
          <li key={movie.movie_id}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
            <p>Rating: {movie.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Top10MoviesDATE;
