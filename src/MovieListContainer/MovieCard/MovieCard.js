import React, {Component} from 'react';
import './MovieCard.scss';

class MovieCard extends Component
{
    OpenMovie = id =>
    { 
        console.log('clicked', id);
    }

    render ()
    {
        let release_date = this.props.movie.release_date.split('-')[0];

        return (
            <div className='card-container' onClick={this.OpenMovie.bind(this, this.props.movie.id)}>
                <div className="image-container"><img src={this.props.movie.poster_path} alt={this.props.movie.title} /></div>
                <div className='movie-infos'>
                    <div>
                        <span className='title'>
                            {this.props.movie.title}
                        </span>
                        <div className="release-date">
                            {release_date}
                        </div>
                    </div>
                    <span className='genre'>
                        {
                            this.props.movie.genres.map(
                                (genre, i) => i === this.props.movie.genres.length - 1 ? genre : genre + ', ')
                        }
                    </span>
                </div>
            </div>
        )
    }
}

export default MovieCard;