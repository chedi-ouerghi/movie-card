import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const ListMoviesAdmin = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5320/api/movies/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMovies(response.data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '75%', margin: 'auto' }}>
      <div style={{ display:'flex', width:'100%', height:'10vh', alignItems:'center', justifyContent:'space-between', padding: '10px', marginBottom: '3%', border:'1px solid'}}>
        <h2 style={{ color: 'green' }}>List Movies</h2>
        <button style={{ width: '15%', height: '100%', background: '#000', color: '#fff', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Link to='/admin/post-movie' style={{textDecoration:'none'}}>post new movie</Link>
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead style={{ backgroundColor: '#f2f2f2' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Title</th>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Director</th>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Stars</th>
              <th style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>Description</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' ,backgroundColor: 'rgb(169 184 196)'}}>
                <td style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>{movie.movie_title}</td>
                <td style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>{movie.movie_director}</td>
                <td style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>{Array.isArray(movie.actor_names) ? movie.actor_names.join(', ') : movie.actor_names}</td>
                <td style={{ padding: '12px', textAlign: 'left', borderRight: '1px solid #ddd' }}>{movie.movie_description}</td>
                <td style={{ padding: '12px', textAlign: 'left' }}>{movie.movie_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListMoviesAdmin;
