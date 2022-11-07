import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ReactStars from 'react-rating-stars-component';
import { Link, link } from 'react-router-dom';


const ratingChanged = (newRating) => {
  console.log(newRating);
};


function MovieCard({movie}) {
 
 
  return (
    
    <Card style={{ width: '18rem',backgroundColor:'gray' }}>
      <Card.Img  variant="top"
       src={movie.posterUrl} 
       alt='movie card'
      height='250px' />
      <Card.Body>
        <Card.Title >{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
       
        <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
    value={movie.rate}
 /> 
 <Link to={`/Descriptions/${movie.id}`}>
  <Button>Description</Button>
  </Link>
  <Link >
     <Button variant='danger' >ShowUrl</Button>
     </Link>
    </Card.Body>
   </Card>
   
  );
}

export default MovieCard;
