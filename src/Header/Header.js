import React, {Component} from 'react';
import './Header.scss';

class Header extends Component {
    render() {
        return (
            <div className="header-container">
                <div className="top-nav">
                    <span className="logo"><b>netflix</b>roulette</span>
                    <button className="add-movie">ADD MOVIE</button>
                </div>
                <div className="search-container">
                    <h2>FIND YOUR MOVIE</h2>
                    <div className="search-input">
                        <input type="text" placeholder="What do you want to watch?"/>
                        <button className="red">SEARCH</button>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Header;