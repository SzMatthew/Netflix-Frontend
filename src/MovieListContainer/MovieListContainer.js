import React, {Component} from 'react';
import './MovieListContainer.scss';
import Navbar from './Navbar/Navbar';

class MovieListContainer extends Component {
    constructor (props)
    {
        super(props);
        this.state = {
            'currentCategory': 'ALL'
        }
     }

    handleNavbarClick = (category) => {
        this.setState({
            'currentCategory': category
        });
    }

    render() {
        return (
            <div className="background">
                <Navbar category={this.state.currentCategory} onCategoryClick={ this.handleNavbarClick}/>
                <div className="movie-count">39 film listed</div>
            </div>
        )
    }
}

export default MovieListContainer;