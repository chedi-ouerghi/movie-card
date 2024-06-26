import React, { useState, useEffect } from 'react';
import movieStarService from '../../../services/movieStarService';
import { Link } from 'react-router-dom';

const MovieStarList = () => {
    const [movieStars, setMovieStars] = useState([]);
    const [filterOption, setFilterOption] = useState('');
    const [filteredMovieStars, setFilteredMovieStars] = useState([]);
    const [titleFilter, setTitleFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    useEffect(() => {
        const fetchMovieStars = async () => {
            try {
                let fetchedMovieStars;

                if (filterOption === 'top_stars') {
                    fetchedMovieStars = await movieStarService.getTopMovieStars();
                } else {
                    fetchedMovieStars = await movieStarService.getAllMovieStars();
                }

                setMovieStars(fetchedMovieStars);
                setFilteredMovieStars(fetchedMovieStars);
            } catch (error) {
                console.error('Error fetching movie stars:', error);
            }
        };

        fetchMovieStars();
    }, [filterOption]);

    useEffect(() => {
        // Ajoutez la logique de filtrage pour les nouveaux filtres
        const filteredStars = movieStars.filter(star => {
            if (filterOption === 'title_movies') {
                return star.movie_title && star.movie_title.toLowerCase().includes(titleFilter.toLowerCase());
            } else if (filterOption === 'movieStarName') {
                return star.star_name && star.star_name.toLowerCase().includes(nameFilter.toLowerCase());
            } else {
                return true; // Pas de filtre ou filtre par défaut
            }
        });

        setFilteredMovieStars(filteredStars);
    }, [movieStars, filterOption, titleFilter, nameFilter]);

    return (
        <div style={{ width: '75%', margin: 'auto',height:'88vh',overflowY:'auto' }}>
            <div style={{ display:'flex',width:'100%',height:'10vh',alignItems:'centre',justifyContent:'space-between', padding: '10px',marginBottom: '3%',border:'1px solid'}}>
                <h2 style={{ color: 'green',height:'100%' }}>Movie Star Associations</h2>
                <div>
                    <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
                        <option value="">-- Filtrer par --</option>
                        <option value="top_stars">Top Stars</option>
                        <option value="title_movies">Titre du film</option>
                        <option value="movieStarName">Nom de la star</option>
                    </select>
                    {filterOption === 'title_movies' && (
                        <input type="text" placeholder="Titre du film" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />
                    )}
                    {filterOption === 'movieStarName' && (
                        <input type="text" placeholder="Nom de la star" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
                    )}
                </div>
                <button style={{ width: '15%', height: '100%', background: '#000', color: '#fff', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Link to='/admin/post-movie' style={{textDecoration:'none'}}>post new Movie Star</Link>
                </button>
            </div>
            <div style={{ overflowY: 'auto',    height: '70vh' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <thead style={{ backgroundColor: '#f5f5f5' }}>
                        <tr>
                            {/* <th style={{ padding: '10px', textAlign: 'left' }}>Movie ID</th> */}
                            <th style={{ padding: '10px', textAlign: 'left' }}>Movie Tile</th>
                            {/* <th style={{ padding: '10px', textAlign: 'left' }}>Star ID</th> */}
                            <th style={{ padding: '10px', textAlign: 'left' }}>Star Name</th>
                            {filterOption === 'top_stars' && <th style={{ padding: '10px', textAlign: 'left' }}>Num Movies</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovieStars.map((movieStar, index) => (
                            <tr key={index} style={{ borderBottom: '1px solid #ddd',backgroundColor: 'rgb(169 184 196)'  }}>
                                {/* <td style={{ padding: '10px', textAlign: 'left' }}>{movieStar.movie_id || index + 1}</td> */}
                                <td style={{ padding: '10px', textAlign: 'left' }}>{movieStar.movie_title || movieStar.title_movies}</td>
                                {/* <td style={{ padding: '10px', textAlign: 'left' }}>{movieStar.star_id || movieStar.id}</td> */}
                                <td style={{ padding: '10px', textAlign: 'left' }}>{movieStar.star_name || movieStar.name}</td>
                                {filterOption === 'top_stars' && <td style={{ padding: '10px', textAlign: 'left' }}>{movieStar.num_movies}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MovieStarList;
