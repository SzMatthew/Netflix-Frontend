import React, {useState, useEffect} from 'react';
import {useCategory} from '../../Contexts/category-context';
import {useOrderBy} from '../../Contexts/order-by-context';
import {useSearch} from '../../Contexts/search-context';
import MovieCard from '../MovieCard/MovieCard';
import Navbar from '../Navbar/Navbar';
import './MovieListContainer.scss';
import notFoundSVG from '../../Images/empty.svg';
import {useLocation} from 'react-router-dom';


const MovieListContainer = () => { 
    const {state: {category}, setCategory}        = useCategory();
    const {state: {orderBy}}                      = useOrderBy();
    const {state: {searchWord}}                   = useSearch();
    const [movies, setMovies]                     = useState([]);
    const [totalMovieAmount, setTotalMovieAmount] = useState(0);
    const location                                = useLocation();
    
    setCategory(location.pathname.replace('/', '').toUpperCase());

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

    const NoMovieToList = () => { 
        return (
            <div className="warning-row">
                <p>There is no movie to list!</p>
                <img src={notFoundSVG} alt="Not Found"/>
            </div>
        );
    }

    return (
        <main>
            <Navbar/>
            <section className="movie-count"><b>{totalMovieAmount}</b> film listed</section>
            <section className='movie-list-container'>
            {
                (movies.length === 0)
                    ? <NoMovieToList />
                    : movies.map(movie => < MovieCard key = {movie.id} movie = {movie}/>)
            }
            </section>
        </main>
    );
}

export default MovieListContainer;