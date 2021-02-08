import React from 'react';
import Modal from 'react-modal';
import {BsX} from 'react-icons/bs';
import {IconContext} from "react-icons";
import {FaCheckCircle} from "react-icons/fa";
import {RiErrorWarningFill} from 'react-icons/ri';
import './StatusResponseModal.scss';

const StatusResponseModal = ({type, isOpen, openModal}) => {
    return (
        <Modal isOpen={isOpen} className='modal response-modal' overlayClassName="modal-overlay" closeTimeoutMS={350}>
            <header className="header">
                <IconContext.Provider value={{className: "close-icon"}}>
                    <BsX onClick={() => openModal(false)}/>
                </IconContext.Provider>
            </header>
            {
                type === 1
                ?   <IconContext.Provider value={{className: "status-icon"}}>
                        <FaCheckCircle/>
                    </IconContext.Provider>
                :   <IconContext.Provider value={{className: "status-icon"}}>
                        <RiErrorWarningFill/>
                    </IconContext.Provider>
            }
            <h2 className="response-title">{type === 1 ? 'CONGRATULATIONS!' : 'WARNING!'}</h2>
            <p className="response-text">{type === 1 ? 'The movie has been successfully uploaded/edited!' : "Couldn't upload/edit movie!"}</p>
        </Modal>
    );
}

export default StatusResponseModal;