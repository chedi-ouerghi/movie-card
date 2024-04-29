import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ handleSearch, handleRatingFilter }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isFieldsVisible, setIsFieldsVisible] = useState(false);

  const ratingChanged = (newRating) => {
    handleRatingFilter(newRating);
  };

  const handleSearchInputChange = (e) => {
    handleSearch(e.target.value);
  };

  const closeNavbar = () => {
    setIsChecked(false);
    setIsFieldsVisible(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setIsFieldsVisible(!isFieldsVisible);
  };

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" checked={isChecked} onChange={handleCheckboxChange} />
      <div className="nav-header">
        <Link to='/' onClick={closeNavbar}>
          <div className="nav-title">
            JoGeek
          </div>
        </Link>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      <div className="nav-links">
        {/* {isFieldsVisible && ( */}
          <div className="group" >

            <input
              type="text"
              placeholder="Search"
              className="search-input"
              onChange={handleSearchInputChange}
          />
                      <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
              classNames="rs-stars"
            />
          </div>
        {/* )} */}
        <div  className='buttons-user-group'>
          <Link to="/login" className="user-button" onClick={closeNavbar}>Login</Link>
          <Link to="/register" className="user-button" onClick={closeNavbar}>Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
