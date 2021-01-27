import React from 'react';
import {Link, useRouteMatch} from 'react-router-dom';
import {useCategory} from '../../Contexts/category-context';
import {useOrderBy} from '../../Contexts/order-by-context';
import './MovieCard.scss';

const MovieCard = ({ movie }) => {
    const releaseDate         = movie.release_date.split('-')[0];
    const {state: {category}} = useCategory();
    const {state: {orderBy}}  = useOrderBy();
    const {path}              = useRouteMatch();

    return (
        <Link to={`${path}/${movie.id}?category=${category}&orderBy=${orderBy}`}>
            <div className='card-container'>
                <div className="image-container"><img src={movie.poster_path} alt={movie.title} /></div>
                <div className='movie-infos'>
                    <div>
                        <span className='title'>{movie.title}</span>
                        <div className="release-date">{releaseDate}</div>
                    </div>
                    <span className='genre'>
                        {movie.genres.map((genre, i) => (i === movie.genres.length - 1) ? genre : genre + ', ')}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;