import React, {useEffect, useState} from 'react';
import {Route, Router, Switch, useParams} from 'react-router-dom';
import { useSearch} from '../../Contexts/search-context'
import './Header.scss';

const Header = () => { 
    const {setSearch} = useSearch();
    const [movie, setMovie] = useState(null);
    const {id} = useParams();
    
    useEffect(() => {
        getMovie();
     }, []);

    const getMovie = () => { 
        fetch('http://localhost:4000/movies/' + 383498)
            .then(res => res.json())
            .then(
                (result) => {
                    setMovie(result);
                }
            );
    }

    const SearchHeader = () => { 
        return (
            <header className="search-header">
                <div className="top-nav">
                    <span className="logo"><b>netflix</b>roulette</span>
                    <button className="add-movie">ADD MOVIE</button>
                </div>
                <section className="search-container">
                    <h2>FIND YOUR MOVIE</h2>
                    <div className="search-input">
                        <input type="text" placeholder="What do you want to watch?" onChange={ (event) => setSearch(event.target.value)}/>
                    </div>
                </section>
            </header>
        );
    }

    const MovieHeader = () => {
        if (movie !== null)
        {
            return (
                <header className="movie-header">
                    <div className="top-nav">
                        <span className="logo"><b>netflix</b>roulette</span>

                    </div>
                    <div className="movie-container">
                        <img src={movie.poster_path} alt={movie.title}></img>
                        <div className="details">
                            <div className="title-score-container">
                                <h2>{movie.title}</h2>
                                <div className="score">
                                    <span>{movie.vote_average}</span>
                                </div>
                            </div>
                            <div className="tagline">
                                <span>{movie.tagline}</span>
                            </div>
                            <div className="date-minutes-container">
                                <span>{movie.release_date.split('-')[0]}</span>
                                <span className="runtime">{movie.runtime} min</span>
                            </div>
                            <div className="overview">
                                <p>{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                </header>
            );
        }
        return <div></div>;
     }

    return (
        <MovieHeader/>
    );
}

export default Header;