import React from 'react';
import {Link, Switch, Route, useRouteMatch} from 'react-router-dom';
import {useSearch} from '../../Contexts/search-context'
import {BsSearch} from 'react-icons/bs';
import {IconContext} from "react-icons";
import {useCategory} from '../../Contexts/category-context';
import './Header.scss';
import {useOrderBy} from '../../Contexts/order-by-context';

const Header = () => { 
    const {setSearch}         = useSearch();
    const {state: {category}} = useCategory();
    const {state: {orderBy}}  = useOrderBy();

    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route path={`${path}/:id`}>
                <div className="small-top-nav">
                    <span className="logo"><b>netflix</b>roulette</span>
                    <IconContext.Provider value={{className: "search-icon"}}>
                        <Link to={`/movies?category=${category}&orderBy=${orderBy}`}>
                            <BsSearch />
                        </Link>
                    </IconContext.Provider>
                </div>
            </Route>    
            <Route>
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
            </Route>
        </Switch>
        
    );
}

export default Header;