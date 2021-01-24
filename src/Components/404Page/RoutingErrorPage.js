import React from 'react';
import {Link} from 'react-router-dom';
import PageNotFound from '../../Images/page_not_found.svg';
import './RoutingErrorPage.scss';

const RoutingErrorPage = () => {

    return (
        <main className="page-not-found-container">
            <span className="logo"><b>netflix</b>roulette</span>
            <div className="content-container">
                <h2>Page Not Found</h2>
                <img src={PageNotFound} alt="Page Not Found"></img>
                <button className="red-border"><Link to={'/'}>GO BACK TO HOME</Link></button>
            </div>
        </main>
    );
}

export default RoutingErrorPage;