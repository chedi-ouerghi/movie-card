import React, { useState, useEffect } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom'; // Importez Link d'ici

const Navbar = ({ handleSearch, handleRatingFilter }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const navbarToggle = document.querySelector(".navbar-toggle");
    const navbarLinks = document.querySelector(".navbar-links");

    navbarToggle.addEventListener("click", () => {
      navbarLinks.classList.toggle("show");
    });

    return () => {
      navbarToggle.removeEventListener("click", () => {
        navbarLinks.classList.toggle("show");
      });
    };
  }, []);

  const ratingChanged = (newRating) => {
    handleRatingFilter(newRating);
  };

  return (
    <div className="navbar">
      {/* Utilisez Link pour envelopper navbar-brand */}
      <Link to="/" className="navbar-brand">Movie App</Link>
      <div className="navbar-toggle" onClick={toggleCollapse}>
        <i className="fas fa-bars"></i>
      </div>
      <div className={`navbar-links ${isCollapsed ? 'collapsed' : 'show'}`}>
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
