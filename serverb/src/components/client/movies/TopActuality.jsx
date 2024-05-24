import React, { useState, useEffect } from "react";
import './TopActuality.css'
import ReactStars from 'react-rating-stars-component';



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
        <h2 className="actuality-movies-title">Trends Now</h2>
      
      <div className="movies-list_actuality">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-actuality">
            <div className="movie-content_actuality">
              <img src={`http://localhost:5320/uploads/movies/${movie.image}`}  alt="Movie Thumbnail" className="movie-thumbnail_actuality" />
              <div className="movie-details_actuality">
<div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                <h3 className="movie-title_actuality">{movie.title}</h3>
                <p className="movie-data_actuality"> <span className="age-red">{movie.age}</span></p>
                </div>
                {/* <p className="movie-data_actuality"></p> */}
                <ReactStars
                  count={5}
                  value={movie.rating}
                  size={24}
                  edit={false}
                  activeColor="#ffd700"
                  classNames="rs-stars"
                />
              </div>
            </div>
            <button className="view-details-button_actuality">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopActuality;
