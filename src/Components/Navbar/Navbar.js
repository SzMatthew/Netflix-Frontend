import React from 'react';
import { useCategory } from '../../Contexts/category-context';
import { useOrderBy } from '../../Contexts/order-by-context';
import { Link } from "react-router-dom"
import './Navbar.scss';

const Navbar = () => { 
    const {state: {category}, setCategory} = useCategory();
    const {state: {orderBy}, setOrderBy}   = useOrderBy();
    
    const changeOrderBy = event => setOrderBy(event.target.value)

    return (
        <nav>
            <ul>
                <li className={category === 'all' ? 'active' : ''} onClick={() => setCategory('all')}>
                    <Link to={`/movies?category=all&orderBy=${orderBy}`}>ALL</Link>
                </li>
                <li className={category === 'documentary' ? 'active' : ''} onClick={() => setCategory('documentary')}>
                    <Link to={`/movies?category=documentary&orderBy=${orderBy}`}>DOCUMENTARY</Link>
                </li>
                <li className={category === 'comedy' ? 'active' : ''} onClick={() => setCategory('comedy')}>
                    <Link to={`/movies?category=comedy&orderBy=${orderBy}`}>COMEDY</Link>
                </li>
                <li className={category === 'horror' ? 'active' : ''} onClick={() => setCategory('horror')}>
                    <Link to={`/movies?category=horror&orderBy=${orderBy}`}>HORROR</Link>
                </li>
                <li className={category === 'crime' ? 'active' : ''} onClick={() => setCategory('crime')}>
                    <Link to={`/movies?category=crime&orderBy=${orderBy}`}>CRIME</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <span>Sort By:</span>
                    <select onChange={changeOrderBy} className="orderBy-select" value={orderBy}>
                        <option value="release_date">Release Date</option>
                        <option value="title">Title</option>
                    </select>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;