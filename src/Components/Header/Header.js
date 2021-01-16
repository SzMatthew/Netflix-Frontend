import React from 'react';
import { useSearch} from '../../Contexts/search-context'
import './Header.scss';

const Header = () => { 
    const {setSearch} = useSearch();

    return (
        <header>
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

export default Header;