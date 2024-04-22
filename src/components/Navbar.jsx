import React from 'react';
import ReactStars from 'react-rating-stars-component';

const Navbar = ({ handleSearch, handleRatingFilter }) => {
  const ratingChanged = (newRating) => {
    handleRatingFilter(newRating);
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">Movie App</div>
      <div className="navbar-links">
        <div className="nav-link">Home</div>
      </div>
      <div className="search-form">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="rating-filter">
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
          classNames="rs-stars"
        />
      </div>
    </div>
  );
};

export default Navbar;
