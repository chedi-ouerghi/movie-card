import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ListMoviesAdmin from './components/admin/list/ListMoviesAdmin';
import PostAdmin from './components/admin/action/PostAdmin';
import MovieStarList from './components/admin/list/MovieStarList';
import StarForm from './components/admin/action/StarForm';
import StarList from './components/admin/list/StarList';
import MovieStarForm from './components/admin/action/MovieStarForm';
import { useAuth } from './services/AuthContext';

function AdminRoutes() {
  const { token } = useAuth();

  return token ? (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/not-found" />} />  */}
      <Route path="/" element={<ListMoviesAdmin token={token} />} /> 
      <Route path="post-movie" element={<PostAdmin token={token} />} /> 
      <Route path="StarList" element={<StarList token={token} />} /> 
      <Route path="StarForm" element={<StarForm token={token} />} /> 
      <Route path="MovieStarList" element={<MovieStarList token={token} />} /> 
      <Route path="MovieStarForm" element={<MovieStarForm token={token} />} />
    </Routes>
  ) : (
    <Navigate to="/not-found" />
  );
}

export default AdminRoutes;
