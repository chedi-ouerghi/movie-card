import React, { useState } from 'react';
import './Navbar.css';
import { FaUser } from 'react-icons/fa';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const Navbar = ({ handleSearch, handleRatingFilter }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);


  const toggleMobileMenu = () => {
  setIsMobileMenuOpen(!isMobileMenuOpen);
};

const toggleUserMenu = () => {
  setIsUserMenuOpen(!isUserMenuOpen);
  };
  


  const ratingChanged = (newRating) => {
    handleRatingFilter(newRating); 
  };

  return (
    <nav>
  <Link to="/" className="logo-link" style={{textDecoration:'none'}}>
        <p className="logo">MOVIE WEB</p>
      </Link>

      <div className={`links ${isMobileMenuOpen ? 'show' : ''}`}>
        <div className="search-rating">
          <div className='input_rating-section'>
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
              classNames="rs-stars"
            />
          </div>
        <div className="user-menu">
        <FaUser className="user-icon" onClick={toggleUserMenu} />
        {isUserMenuOpen && (
          <div className="user-dropdown">
            <Link to="/login" className="user-option">Login</Link>
            <Link to="/register" className="user-option">Register</Link>
          </div>
        )}
      </div>
        </div>
      </div>

    <div className="menu" onClick={toggleMobileMenu}>
      <div className={`middle ${isMobileMenuOpen ? 'close' : ''}`}></div>
    </div>
    </nav>
  );
};

export default Navbar;
