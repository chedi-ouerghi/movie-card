// AdminRoutes.js
import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ListMoviesAdmin from '../components/admin/list/ListMoviesAdmin';
import PostAdmin from '../components/admin/action/PostAdmin';
import MovieStarList from '../components/admin/list/MovieStarList';
import StarForm from '../components/admin/action/StarForm';
import StarList from '../components/admin/list/StarList';
import MovieStarForm from '../components/admin/action/MovieStarForm';
import { useAuth } from '../services/AuthContext';

function AdminRoutes() {
  const { token, role } = useAuth();

  if (!token || role !== 'admin') {
    return <Navigate to="/not-found" />;
  }

  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/list-movies" element={<ListMoviesAdmin />} />
      <Route path="/post-movie" element={<PostAdmin />} />
      <Route path="/StarList" element={<StarList />} />
      <Route path="/StarForm" element={<StarForm />} />
      <Route path="/MovieStarList" element={<MovieStarList />} />
      <Route path="/MovieStarForm" element={<MovieStarForm />} />
    </Routes>
  );
}

function AdminHome() {
  return (
    <div>
      <div className="landscape">
        <div className="mountain" />
        <div className="mountain mountain-2" />
        <div className="mountain mountain-3" />
        <div className="sun-container sun-container-1"></div>
        <div className="sun-container">
          <div className="sun" />
        </div>
        <div className="cloud" />
        <div className="cloud cloud-1" />
        <div className="sun-container sun-container-reflection">
          <div className="sun" />
        </div>
        <div className="light" />
        <div className="light light-1" />
        <div className="light light-2" />
        <div className="light light-3" />
        <div className="light light-4" />
        <div className="light light-5" />
        <div className="light light-6" />
        <div className="light light-7" />
        <div className="water" />
        <div className="splash" />
        <div className="splash delay-1" />
        <div className="splash delay-2" />
        <div className="splash splash-4 delay-2" />
        <div className="splash splash-4 delay-3" />
        <div className="splash splash-4 delay-4" />
        <div className="splash splash-stone delay-3" />
        <div className="splash splash-stone splash-4" />
        <div className="splash splash-stone splash-5" />
        <div className="lotus lotus-1" />
        <div className="lotus lotus-2" />
        <div className="lotus lotus-3" />
        <div className="front">
          <div className="stone" />
          <div className="grass" />
          <div className="grass grass-1" />
          <div className="grass grass-2" />
          <div className="reed" />
          <div className="reed reed-1" />
        </div>
      </div>
      <div className="menu page__menu">
        <ul className="menu__list">
          <li className="menu__item">
            <Link className="menu__link" to="/admin/list-movies">List Movies</Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/admin/post-movie">Post Movie</Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/admin/StarList">List Stars</Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/admin/StarForm">Add Star</Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/admin/MovieStarList">List Movies with Stars</Link>
          </li>
          <li className="menu__item">
            <Link className="menu__link" to="/admin/MovieStarForm">Add Movie with Stars</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { AdminRoutes, AdminHome };
