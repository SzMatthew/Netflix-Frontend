import React, {useEffect, useState} from 'react';
import {useQuery} from '../../hooks/useQuery';

import './MovieDetails.scss';

const MovieDetails = () => {
    const MovieIDQueryParam = useQuery().get('id');
    const [movie, setMovie] = useState(null);

    useEffect(() => getMovie(), [MovieIDQueryParam]);

    const getMovie = () => { 
        fetch("http://localhost:4000/movies/" + MovieIDQueryParam)
			.then((res) => res.json())
			.then((result) => {
				setMovie(result);
			});
    }

    if (movie !== null)
    {
        return (
            <header className="movie-header">
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
                            <span className="runtime">
                                {movie.runtime ? movie.runtime + 'min' : ''}
                            </span>
                        </div>
                        <div className="overview">
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
    else
    {
        return (
            <></>
        )
    }
}

export default MovieDetails;