import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import './movieDetails.css';



const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:5320/api/movies/${id}`);
        setMovie(response.data);
      } catch (err) {
        console.error('Error fetching movie:', err);
        setError('Error fetching movie');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }


  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <div className="MovieDetails">
      <div className="movie_card" id="tomb">
        <div className="info_section">
          <div className="movie_header">
            <img className="locandina" src="/image.jpg" alt={movie.title} />
            <h1>{movie.title}</h1>
            <h4>{movie.director}</h4>
            <h5>{movie.stars}</h5>
          </div>
          <div className="movie_desc">
            <p className="text">{movie.description}</p>
            <ReactStars
              count={5}
              value={movie.rating}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
              edit={false}
              half={false}
              classNames="rs-stars"
            />
            <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="trailer_link">
              Watch Trailer
            </a>
          </div>
        </div>
        <div className="blur_back"
          // style={{ backgroundImage: `url(${movie.image})` }}
        >
                  <img src="/image.jpg" alt={movie.title} />
</div>
      </div>
    </div>
  );
};

export default MovieDetail;
