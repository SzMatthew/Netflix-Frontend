import React from 'react';
import { useCategory } from '../../Contexts/category-context';
import { useOrderBy } from '../../Contexts/order-by-context';
import { Link } from "react-router-dom"
import './Navbar.scss';

const Navbar = () => { 
    const {state: {category}, setCategory} = useCategory();
    const { setOrderBy } = useOrderBy();
    const changeOrderBy = event => setOrderBy(event.target.value)
    const navbarClick = category => setCategory(category)

    return (
        <nav>
            <ul>
                <li className={category === 'all' ? 'active' : ''} onClick={navbarClick.bind(this,'all')}><Link to="/movies?category=all">ALL</Link></li>
                <li className={category === 'documentary' ? 'active' : '' } onClick={navbarClick.bind(this, 'documentary')}><Link to="/movies?category=documentary">DOCUMENTARY</Link></li>
                <li className={category === 'comedy' ? 'active' : ''} onClick={navbarClick.bind(this, 'comedy')}><Link to="/movies?category=comedy">COMEDY</Link></li>
                <li className={category === 'horror' ? 'active' : ''} onClick={navbarClick.bind(this, 'horror')}><Link to="/movies?category=horror">HORROR</Link></li>
                <li className={category === 'crime' ? 'active' : ''} onClick={navbarClick.bind(this, 'crime')}><Link to="/movies?category=crime">CRIME</Link></li>
            </ul>
            <ul>
                <li>
                    <span>Sort By:</span>
                    <select onChange={changeOrderBy} className="orderBy-select">
                        <option value="release_date">Release Date</option>
                        <option value="title">Title</option>
                    </select>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;