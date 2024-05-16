import React, { useState } from "react";
import './FeedbackWatcher.css';

const FeedbackWatcher = () => {
  const movies = [
    {
      id: 115,
      title: "Fast and Furious",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 116,
      title: "Amélie",
      rating: 3,
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 117,
      title: "The Ring",
      rating: 4,
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 118,
      title: "Interstellar",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    {
      id: 119,
      title: "Oldboy",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=5"
    }
  ];

  const [feedbacks, setFeedbacks] = useState([
    { text: "Great session!", movieId: 115 },
    { text: "Loved the content!", movieId: 116 },
    { text: "Very informative.", movieId: 117 },
    { text: "Outstanding visuals.", movieId: 118 },
    { text: "Intense and gripping.", movieId: 119 }
  ]);

  const getMovieDetails = (movieId) => {
    return movies.find(movie => movie.id === movieId);
  };

  return (
    <div className="feedback-watcher">
      <div className="feedback-list">
        {feedbacks.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedbacks.map((feedback, index) => {
            const movie = getMovieDetails(feedback.movieId);
            return (
              <div key={index} className="feedback-item">
                <img src={movie.avatar} alt="avatar" className="avatar" />
                <div className="feedback-content">
                  <p className="feedback-text">{feedback.text}</p>
                  <p className="movie-title">{movie.title}</p>
                  <p className="movie-rating">Rating: {movie.rating} / 5</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FeedbackWatcher;
