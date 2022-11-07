import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom'


function Descriptions({movies}) {
    const {id}=useParams();

const movie=movies.find((movie)=>movie.id==id)
console.log(movie)
  return (
<div >
    <Card style={{ width: 'auto',backgroundColor:'gray' }}>
    <Card.Img variant="top" src={movie.posterUrl} alt='photo'style={{ width: '20rem' }} />
    <Card.Body>
    <ListGroup.Item><h1>#️⃣{movie.id}</h1></ListGroup.Item>
    <Card.Link href="#"><h1><button>{movie.link}</button></h1></Card.Link>

      <Card.Title><h1>🎞️{movie.title}</h1></Card.Title>
      <Card.Text>
      <h1>{movie.description}</h1>

      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item><h1>⭐{movie.rate}</h1></ListGroup.Item>
    </ListGroup>
    <Card.Body>
      <Card.Link href="#"><h1><button>{movie.posterUrl}</button></h1></Card.Link>
    </Card.Body>
  </Card>
    


    </div>
    
    )
}

export default Descriptions