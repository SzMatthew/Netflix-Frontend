import React, {Component} from 'react';
import './Navbar.scss';

class Navbar extends Component {

    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li className={this.props.category === 'ALL' ? 'active' : ''} onClick={ this.props.onCategoryClick.bind(this, 'ALL')}>ALL</li>
                        <li className = { this.props.category === 'DOCUMENTARY' ? 'active' : '' } onClick={ this.props.onCategoryClick.bind(this, 'DOCUMENTARY')}>DOCUMENTARY</li>
                        <li className = { this.props.category === 'COMEDY' ? 'active' : ''} onClick={ this.props.onCategoryClick.bind(this, 'COMEDY')}>COMEDY</li>
                        <li className = { this.props.category === 'HORROR' ? 'active' : ''} onClick={ this.props.onCategoryClick.bind(this, 'HORROR')}>HORROR</li>
                        <li className = { this.props.category === 'CRIME' ? 'active' : ''} onClick={ this.props.onCategoryClick.bind(this, 'CRIME')}>CRIME</li>
                    </ul>
                    <ul>
                        <li>SORT BY</li>
                        <li>REALESE DATE</li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navbar;