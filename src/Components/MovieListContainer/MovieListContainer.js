import React, {useState, useEffect} from 'react';
import {useCategory} from '../../Contexts/category-context';
import {useOrderBy} from '../../Contexts/order-by-context';
import {useSearch} from '../../Contexts/search-context';
import { useQuery } from '../../hooks/useQuery';
import MovieCard from '../MovieCard/MovieCard';
import Navbar from '../Navbar/Navbar';
import MovieDetails from '../MovieDetails/MovieDetails';
import notFoundSVG from '../../Images/empty.svg';
import Loading from '../Loading/Loading';
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import './MovieListContainer.scss';

const MovieListContainer = () => {
    const {state: {category}, setCategory}        = useCategory();
    const {state: {orderBy}, setOrderBy}          = useOrderBy();
    const {state: {searchWord}}                   = useSearch();
    const [movies, setMovies]                     = useState([]);
    const [totalMovieAmount, setTotalMovieAmount] = useState(0);
    const [isLoading, setLoading]                   = useState(false);
    const categoryQueryParam                      = useQuery().get('category');
    const {path}                                  = useRouteMatch();
    const orderByQueryParam                       = useQuery().get('orderBy');

    useEffect(() => setCategory(categoryQueryParam), [categoryQueryParam]);
    useEffect(() => setOrderBy(orderByQueryParam), [orderByQueryParam]);

    // eslint-disable-next-line
    useEffect(() => getMovies(), [category, orderBy, searchWord]);

    const getMovies = async () => { 
        setLoading(true);
        const response = await fetch('http://localhost:4000/movies?limit=100&filter=' + (category === 'all' ? '' : category) + `&sortBy=${orderBy}&sortOrder=desc&search=${searchWord}&searchBy=title`);
        const json = await response.json();

        setMovies(json.data);
        setLoading(false);
        setTotalMovieAmount(json.data.length);      
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
        <>
            <Switch>
                <Route path={`${path}/:id`}>
                    <MovieDetails/>
                </Route>
            </Switch>
            <main>
                <Navbar/>
                <section className="movie-count"><b>{totalMovieAmount}</b> film listed</section>
                <section className='movie-list-container'>
                    {
                        (movies.length === 0)
                            ? <NoMovieToList />
                            : movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
                    }
                </section>
                
            </main>
            {
                isLoading
                    ? <Loading />
                    : null
            }
        </>
    );
}

export default MovieListContainer;