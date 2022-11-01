import MovieCard from './Card'
function MovieList({ movies, searchTitle, searchRate}) {
  return (
    <>
            <div className='row justify-content-center'>
            {movies .filter( (movie) => movie.title .toUpperCase() .includes(searchTitle.toUpperCase().trim()) 
            &&
            movie.rate >= searchRate).map((movie) => (
          
          <MovieCard 
          movie={movie} 
          key={movie.id} 
          />
        ))}
                
            </div>
 </>
  )
}

export default MovieList