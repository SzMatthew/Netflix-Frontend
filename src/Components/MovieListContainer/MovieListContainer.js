import React, {useState, useEffect} from 'react';
import {useCategory} from '../../Contexts/category-context';
import {useOrderBy} from '../../Contexts/order-by-context';
import {useSearch} from '../../Contexts/search-context';
import MovieCard from '../MovieCard/MovieCard';
import Navbar from '../Navbar/Navbar';
import './MovieListContainer.scss';


const MovieListContainer = () => { 
    const {state: {category}}                     = useCategory();
    const {state: {orderBy}}                      = useOrderBy();
    const {state: {searchWord}}                   = useSearch();
    const [movies, setMovies]                     = useState([]);
    const [totalMovieAmount, setTotalMovieAmount] = useState(0);

    // eslint-disable-next-line
    useEffect(() => getMovies(), [category, orderBy, searchWord]);

    const getMovies = () => { 
        fetch('http://localhost:4000/movies?limit=100&filter=' + (category === 'ALL' ? '' : category.toLowerCase()) + `&sortBy=${orderBy}&sortOrder=desc&search=${searchWord}&searchBy=title`)
            .then(res => res.json())
            .then(
                ({data}) => {
                    setMovies(data);
                    setTotalMovieAmount(data.length);
                }
            );
    }

    return (
        <main>
            <Navbar/>
            <section className="movie-count"><b>{totalMovieAmount}</b> film listed</section>
            <section className='movie-list-container'>
            {
                (movies.length === 0)?
                <div className="warning-row">
                        There is no movie to list!
                </div>:
                movies.map(movie => < MovieCard key = {movie.id} movie = {movie}/>)
            }
            </section>
        </main>
    );
}

export default MovieListContainer;