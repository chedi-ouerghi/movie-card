import React, { useState, useEffect } from "react";
import axios from 'axios';

const ListMoviesAdmin = ({ token }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5320/api/movies/getAll-Movie', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
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
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '75%', margin: 'auto' }}>
      <h2>List Movies</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Director</th>
              <th style={tableHeaderStyle}>Stars</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{movie.title}</td>
                <td style={tableCellStyle}>{movie.director}</td>
                <td style={tableCellStyle}>{Array.isArray(movie.stars) ? movie.stars.join(', ') : movie.stars}</td>
                <td style={tableCellStyle}>{movie.description}</td>
                <td style={tableCellStyle}>{movie.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: '#f2f2f2',
  borderBottom: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left'
};

const tableRowStyle = {
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '8px',
  textAlign: 'left',
  '@media (maxWidth: 768px)': {
      fontSize: '12px'
  }
};

export default ListMoviesAdmin;
