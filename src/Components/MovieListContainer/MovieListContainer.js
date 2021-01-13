import React, {useState, useEffect} from 'react';
import {useCategory} from '../../Contexts/category-context';
import MovieCard from '../MovieCard/MovieCard';
import Navbar from '../Navbar/Navbar';
import './MovieListContainer.scss';


const MovieListContainer = () => { 
    const {state: {category}}  = useCategory();
    const [movies, setMovies]                     = useState([]);
    const [totalMovieAmount, setTotalMovieAmount] = useState(0);

    // eslint-disable-next-line
    useEffect(() => getMovies(), [category]);

    const getMovies = () => { 
        fetch('http://localhost:4000/movies?limit=60&filter=' + (category === 'ALL' ? '' : category.toLowerCase()))
            .then(res => res.json())
            .then(
                ({data}) => {
                    setMovies(data);
                    setTotalMovieAmount(data.length);
                }
            );
    }


    return (
        <div className="background" id="movie_list_container">
            <Navbar/>
            <div className="movie-count"><b>{totalMovieAmount}</b> film listed</div>
            <div className='movie-list-container'>
            {
                    movies.map(movie => 
                        < MovieCard key = {movie.id} movie = {movie} />
                )
            }
            </div>
        </div>
    );
}

export default MovieListContainer;