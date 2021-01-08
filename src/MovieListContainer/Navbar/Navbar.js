import React from 'react';
import './Navbar.scss';

const Navbar = ({category, onCategoryClick}) => { 
    return (
        <div>
            <nav>
                <ul>
                    <li className = { category === 'ALL' ? 'active' : ''} onClick={ onCategoryClick.bind(this, 'ALL')}>ALL</li>
                    <li className = { category === 'DOCUMENTARY' ? 'active' : '' } onClick={ onCategoryClick.bind(this, 'DOCUMENTARY')}>DOCUMENTARY</li>
                    <li className = { category === 'COMEDY' ? 'active' : ''} onClick={ onCategoryClick.bind(this, 'COMEDY')}>COMEDY</li>
                    <li className = { category === 'HORROR' ? 'active' : ''} onClick={ onCategoryClick.bind(this, 'HORROR')}>HORROR</li>
                    <li className = { category === 'CRIME' ? 'active' : ''} onClick={ onCategoryClick.bind(this, 'CRIME')}>CRIME</li>
                </ul>
                <ul>
                    <li>SORT BY</li>
                    <li>REALESE DATE</li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;