import React from 'react';
import {useCategory} from '../../Contexts/category-context';
import './Navbar.scss';

const Navbar = () => { 
    const {state: {category}, setCategory} = useCategory();

    return (
                <div>
                    <nav>
                        <ul>
                            <li className={category === 'ALL' ? 'active' : ''} onClick={() => setCategory('ALL')}>ALL</li>
                            <li className={category === 'DOCUMENTARY' ? 'active' : '' } onClick={() => setCategory('DOCUMENTARY')}>DOCUMENTARY</li>
                            <li className={category === 'COMEDY' ? 'active' : ''} onClick={() => setCategory('COMEDY')}>COMEDY</li>
                            <li className={category === 'HORROR' ? 'active' : ''} onClick={() => setCategory('HORROR')}>HORROR</li>
                            <li className={category === 'CRIME' ? 'active' : ''} onClick={() => setCategory('CRIME')}>CRIME</li>
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