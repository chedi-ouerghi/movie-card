import React, { useState, useEffect } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Navbar.css';

const Navbar = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isFieldsVisible, setIsFieldsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); 
  }, []);

  const closeNavbar = () => {
    setIsChecked(false);
    setIsFieldsVisible(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setIsFieldsVisible(!isFieldsVisible);
  };

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    
    setIsLoggedIn(false);
    
    navigate('/');
  };

  const adminMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/admin/list-movies" onClick={closeNavbar}>List Movies</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/admin/post-movie" onClick={closeNavbar}>Post Movie</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/admin/StarList" onClick={closeNavbar}>Star List</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/admin/StarForm" onClick={closeNavbar}>Star Form</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/admin/MovieStarList" onClick={closeNavbar}>Movie Star List</Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to="/admin/MovieStarForm" onClick={closeNavbar}>Movie Star Form</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" checked={isChecked} onChange={handleCheckboxChange} />
      <div className="nav-header">
        <Link to='/' onClick={closeNavbar}>
          <div className="nav-title">
            WEB MOVIE
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
        {/* Afficher les liens Login et Register uniquement si l'utilisateur n'est pas connecté */}
        {!isLoggedIn && (
          <div className='buttons-user-group'>
           <Link to="/login" className="user-button" onClick={closeNavbar}><button id='btn_nav'>Login</button></Link>
            <Link to="/register" className="user-button" onClick={closeNavbar}><button id='btn_nav'> Register</button></Link>
          </div>
        )}
        {/* Dropdown pour les liens d'administration */}
        {isLoggedIn && (
          <>
            <Dropdown overlay={adminMenu} trigger={['click']} placement="bottomRight">
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                Admin <DownOutlined />
              </a>
            </Dropdown>
            <Link to="/" className="user-button" onClick={handleLogout}>Logout</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
