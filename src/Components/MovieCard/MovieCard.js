import React from 'react';
import './MovieCard.scss';

const MovieCard = ({ movie }) =>
{
    const openMovie = () => console.log('clicked', movie.id);

    const releaseDate = movie.release_date.split('-')[0];

    return (
        <div className='card-container' onClick={openMovie}>
            <div className="image-container"><img src={movie.poster_path} alt={movie.title} /></div>
            <div className='movie-infos'>
                <div>
                    <span className='title'>
                        {movie.title}
                    </span>
                    <div className="release-date">
                        {releaseDate}
                    </div>
                </div>
                <span className='genre'>
                    {
                        movie.genres.map((genre, i) => i === movie.genres.length - 1 ? genre : genre + ', ')
                    }
                </span>
            </div>
        </div>
    );
}

export default MovieCard;