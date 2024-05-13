import React, { useState, useEffect } from 'react';
import starService from '../../../services/starService';

const StarList = () => {
    const [stars, setStars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStars = async () => {
            try {
                const response = await starService.getAllStars();
                if (Array.isArray(response)) {
                    setStars(response); // Assurez-vous que le service retourne directement un tableau d'étoiles
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStars();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ width: '75%', margin: 'auto' }}>
            <div style={{ display:'flex',width:'100%',height:'10vh',alignItems:'centre',justifyContent:'space-between', padding: '10px',marginBottom: '3%',border:'1px solid'}}>
                <h2 style={{ color: 'green', height: '100%' }}>Star List</h2>
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <thead style={{ backgroundColor: '#f5f5f5' }}>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Image</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Date of Birth</th>
                            <th style={{ padding: '10px', textAlign: 'left' }}>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stars.map(star => (
                            <tr key={star.id} style={{ borderBottom: '1px solid #ddd',backgroundColor: 'rgb(169 184 196)'  }}>
                                <td style={{ padding: '10px', textAlign: 'left' }}><img src={star.image} alt={star.name} style={{ width: '50px', height: 'auto' }} /></td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{star.name}</td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{star.date_of_birth}</td>
                                <td style={{ padding: '10px', textAlign: 'left' }}>{star.country}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StarList;
