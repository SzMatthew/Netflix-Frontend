import React, { useState, useEffect}from 'react';
import MovieCard from './MovieCard/MovieCard';
import Navbar from './Navbar/Navbar';
import './MovieListContainer.scss';

const MovieListContainer = () => { 
    const [currentCategory, setCurrentCategory]   = useState('ALL');
    const [movies, setMovies]                     = useState([]);
    const [totalMovieAmount, setTotalMovieAmount] = useState(0);

    useEffect(() => getMovies(), []);

    const getMovies = () => { 
        fetch('http://localhost:4000/movies')
            .then(res => res.json())
            .then(
                (result) => {
                    setMovies(result.data);
                    setTotalMovieAmount(result.totalAmount);
                }
            );
    }

    const handleNavbarClick = category => setCurrentCategory(category);

    return (
        <div className="background" id="movie_list_container">
            <Navbar category={currentCategory} onCategoryClick={handleNavbarClick} />
            <div className="movie-count"><b>{totalMovieAmount}</b> film listed</div>
            <div className='movie-list-container'>
            {
                movies.map(movie =>
                    <MovieCard key={movie.id} movie={movie}/>
                )
            }
            </div>
        </div>
    );
}

export default MovieListContainer;