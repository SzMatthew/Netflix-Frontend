import React from 'react';
import {Link} from 'react-router-dom';
import {useSearch} from '../../Contexts/search-context'
import {BsSearch} from 'react-icons/bs';
import {IconContext} from "react-icons";
import {useQuery} from '../../hooks/useQuery';
import {useCategory} from '../../Contexts/category-context';
import './Header.scss';

const Header = () => { 
    const {setSearch}         = useSearch();
    const {state: {category}} = useCategory();
    const idQueryParam        = useQuery().get('id');

    if(idQueryParam) {
        return (
            <div className="top-nav">
                <span className="logo"><b>netflix</b>roulette</span>
                <IconContext.Provider value={{className: "search-icon"}}>
                    <Link to={`?category=${category}`}>
                        <BsSearch />
                    </Link>
                </IconContext.Provider>
            </div>
        );
    }

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

export default Header;