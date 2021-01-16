import React from 'react';
import {useCategory} from '../../Contexts/category-context';
import {useOrderBy} from '../../Contexts/order-by-context';
import {Link} from "react-router-dom"
import './Navbar.scss';

const Navbar = () => { 
    const {state: {category}, setCategory} = useCategory();
    const {setOrderBy} = useOrderBy();

    const changeOrderBy = (event) => { 
        setOrderBy(event.target.value);
    }

    return (
        <nav>
            <ul>
                <li className={category === '' ? 'active' : ''} onClick={() => setCategory('ALL')}><Link to="/">ALL</Link></li>
                <li className={category === 'DOCUMENTARY' ? 'active' : '' } onClick={() => setCategory('DOCUMENTARY')}><Link to="/documentary">DOCUMENTARY</Link></li>
                <li className={category === 'COMEDY' ? 'active' : ''} onClick={() => setCategory('COMEDY')}><Link to="/comedy">COMEDY</Link></li>
                <li className={category === 'HORROR' ? 'active' : ''} onClick={() => setCategory('HORROR')}><Link to="/horror">HORROR</Link></li>
                <li className={category === 'CRIME' ? 'active' : ''} onClick={() => setCategory('CRIME')}><Link to="/crime">CRIME</Link></li>
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