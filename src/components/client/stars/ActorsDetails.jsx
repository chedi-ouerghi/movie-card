import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ActorsDetails = () => {

  const { id } = useParams();
  const [star, setStar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStar = async () => {
      try {
        const response = await axios.get(`http://localhost:5320/api/stars/${id}`);
        setStar(response.data);
      } catch (err) {
        console.error('Error fetching star:', err);
        setError('Error fetching star');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStar();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!star) {
    return <div>Star not found</div>;
  }

  return (
    <div className="star-card">
      <div className="container_details">
        <a href="/">
          <img
            src="/image.jpg"
            className="cover"
            alt={star.name}
          />
        </a>
        <div className="hero">
          <div className="details">
            <div className="title1">
              {star.name}
              <span>PG-13</span>
            </div>
            <div className="title2">
              <b className='title_b'>Date of Birth:</b> {star.date_of_birth}
            </div>
            <fieldset className="rating">
              {/* Rating field */}
            </fieldset>
            {/* <span className="likes">109 likes</span> */}
          </div>{" "}
          {/* end details */}
        </div>{" "}
        {/* end hero */}
        <div className="description">
          <div className="column1">
            <span className="tag">Action</span>
            <span className="tag">Fantasy</span>
            <span className="tag">Adventure</span>
          </div>{" "}
          {/* end column1 */}
          <div className="column2">
            <p>
              <b className='title_b'>Country:</b> {star.country}{" "}
              {/* <a href="/read-more">Read more</a> */}
            </p>
            <div className="avatars">
            <b className='title_b'> Description :</b>
            </div>{" "}
            {/* end avatars */}
          </div>{" "}
          {/* end column2 */}
        </div>{" "}
        {/* end description */}
      </div>{" "}
      {/* end container */}
    </div> 
  );
};

export default ActorsDetails;
