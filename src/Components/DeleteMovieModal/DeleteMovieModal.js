import React, {useState} from 'react';
import Modal from 'react-modal';
import {BsX} from 'react-icons/bs';
import {IconContext} from "react-icons";
import './DeleteMovieModal.scss';

const DeleteMovieModal = ({movieId, isOpen, openModal}) => {
    const [isDeleted, setIsDeleted] = useState(false);

    const DeleteMovie = () => {
        fetch("http://localhost:4000/movies/" + movieId, {
            method: 'DELETE'
        }).then(() => setIsDeleted(true));
    }

    return (
        <Modal isOpen={isOpen} className='modal' overlayClassName="modal-overlay" closeTimeoutMS={350}>
            <header>
                <h2>DELETE MOVIE</h2>
                <IconContext.Provider value={{className: "close-icon"}}>
                    <BsX onClick={() => openModal(false)}/>
                </IconContext.Provider>
            </header>
            <section>
                <h3>Are you sure you want to delete this movie?</h3>
            </section>
            <footer>
                {
                    isDeleted
                        ? <div className="movie-delted-msg">Movie successfully deleted!</div>
                        : <button className="red" onClick={DeleteMovie}>CONFIRM</button>
                }
            </footer>
        </Modal>
    );
}

export default DeleteMovieModal;