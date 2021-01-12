import React from 'react';
import './Navbar.scss';
import {CategoryContext} from '../../Contexts/category-context';

const Navbar = ({onCategoryClick}) => { 
    return (
        <CategoryContext.Consumer>
            {(currentCategory) => (
                <div>
                    <nav>
                        <ul>
                            <li className = { currentCategory === 'ALL' ? 'active' : ''} onClick={ onCategoryClick.bind(this, 'ALL')}>ALL</li>
                            <li className = { currentCategory === 'DOCUMENTARY' ? 'active' : '' } onClick={ onCategoryClick.bind(this, 'DOCUMENTARY')}>DOCUMENTARY</li>
                            <li className = { currentCategory === 'COMEDY' ? 'active' : ''} onClick={ onCategoryClick.bind(this, 'COMEDY')}>COMEDY</li>
                            <li className = { currentCategory === 'HORROR' ? 'active' : ''} onClick={ onCategoryClick.bind(this, 'HORROR')}>HORROR</li>
                            <li className = { currentCategory === 'CRIME' ? 'active' : ''} onClick={ onCategoryClick.bind(this, 'CRIME')}>CRIME</li>
                        </ul>
                        <ul>
                            <li>SORT BY</li>
                            <li>REALESE DATE</li>
                        </ul>
                    </nav>
                </div> 
            )}
        
        </CategoryContext.Consumer>
    );
}

export default Navbar;