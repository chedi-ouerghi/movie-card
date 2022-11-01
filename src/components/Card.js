import React from 'react';
import Card from 'react-bootstrap/Card';
import ReactStars from 'react-rating-stars-component';


const ratingChanged = (newRating) => {
  console.log(newRating);
};


function MovieCard({movie}) {
 
 
  return (
    
    <Card style={{ width: '18rem' }}>
      <Card.Img id='img' variant="top" src={movie.posterUrl}  />
      <Card.Body>
        <Card.Title >{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        
        <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    activeColor="#ffd700"
    value={movie.rate}
 />,
      </Card.Body>
   </Card>
   
  );
}

export default MovieCard;
