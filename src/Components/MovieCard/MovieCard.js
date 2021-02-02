import React, {useState} from 'react';
import AddEditMovieForm from '../../Components/Add-EditMovieForm/AddEditMovieForm';
import DeleteMovieModal from '../DeleteMovieModal/DeleteMovieModal';
import {Link, useRouteMatch} from 'react-router-dom';
import {useCategory} from '../../Contexts/category-context';
import {useOrderBy} from '../../Contexts/order-by-context';
import {BsThreeDotsVertical, BsX} from 'react-icons/bs';
import {IconContext} from "react-icons";
import './MovieCard.scss';

const MovieCard = ({movie}) => {
    const releaseDate                               = movie.release_date.split('-')[0];
    const {state: {category}}                       = useCategory();
    const {state: {orderBy}}                        = useOrderBy();
    const {path}                                    = useRouteMatch();
    const [optionsIsOpen, setOptionsIsOpen]         = useState(false);
    const [editMovieIsOpen, setEditMovieIsOpen]     = useState(false);
    const [deleteMovieIsOpen, setDeleteMovieIsOpen] = useState(false);

    return (
        <>
            <div className='card-container'>
                <Link to={`${path}/${movie.id}?category=${category}&orderBy=${orderBy}`}>
                    <div className="image-container">
                        <img src={movie.poster_path} alt={movie.title} />
                        
                    </div>
                    <div className='movie-infos'>
                        <div>
                            <span className='title'>{movie.title}</span>
                            <div className="release-date">{releaseDate}</div>
                        </div>
                        <span className='genre'>
                            {movie.genres.map((genre, i) => (i === movie.genres.length - 1) ? genre : genre + ', ')}
                        </span>
                    </div>
                </Link>
                {
                    optionsIsOpen
                        ? <div className="options-dropdown">
                            <div>
                                <IconContext.Provider value={{className: "close-icon"}}>
                                    <BsX onClick={() => setOptionsIsOpen(false)}/>
                                </IconContext.Provider>
                            </div>
                            <p onClick={() => setEditMovieIsOpen(true)}>Edit</p>
                            <p onClick={() => setDeleteMovieIsOpen(true)}>Delete</p>
                        </div>
                        : <div className="options-icon-container">
                            <IconContext.Provider value={{className: "options-icon"}}>
                                <BsThreeDotsVertical onClick={() => setOptionsIsOpen(true)}/>
                            </IconContext.Provider>
                        </div>
                }   
            </div>
            <AddEditMovieForm title={'EDIT MOVIE'} movieId={movie.id} isOpen={editMovieIsOpen} openModal={(isOpen) => setEditMovieIsOpen(isOpen)} />
            <DeleteMovieModal movieId={movie.id} isOpen={deleteMovieIsOpen} openModal={(isOpen) => setDeleteMovieIsOpen(isOpen)}/>
        </>
    );
}

export default MovieCard;