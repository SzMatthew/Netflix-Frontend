import React, {Component} from 'react';
import MovieCard from './MovieCard/MovieCard';
import './MovieListContainer.scss';
import Navbar from './Navbar/Navbar';

class MovieListContainer extends Component
{
    state = {
        'currentCategory' : 'ALL',
        'movies'          : [],
        'totalMovieAmount': 0,
        'offset'          : 0
    }

    componentDidMount() { 
        this.getMovies();
    }
    
    getMovies = () =>
    { 
        fetch('http://localhost:4000/movies?offset=' + (this.state.offset === 0 ? 0 : this.state.offset + 1))
            .then(res => res.json())
            .then(
                (result) =>
                {
                    this.setState({
                        ...this.state,
                        'movies'          : result.data,
                        'totalMovieAmount': result.totalAmount,
                        'offset'          : this.state.offset + 1
                    });
                }
            );
    }
    
    handleNavbarClick = category => {
        this.setState({
            'currentCategory': category
        });
    }

    render() {
        return (
            <div className="background" id="movie_list_container">
                <Navbar category={this.state.currentCategory} onCategoryClick={this.handleNavbarClick} />
                <div className="movie-count"><b>{this.state.totalMovieAmount}</b> film listed</div>
                <div className='movie-list-container'>
                {
                    this.state.movies.map(movie =>
                        <MovieCard key={movie.id} id={movie.id} movie={movie}/>
                    )
                }
                </div>
            </div>
        )
    }
}

export default MovieListContainer;