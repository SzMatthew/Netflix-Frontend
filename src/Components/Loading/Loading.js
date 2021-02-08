import React from 'react';
import {AiOutlineLoading} from 'react-icons/ai';
import {IconContext} from "react-icons";
import './Loading.scss';

const Loading = () => {
    return (
        <div className="snackbar">
            <div className="wrapper">
                <IconContext.Provider value={{className: "loading-icon"}}>
                    <AiOutlineLoading />
                </IconContext.Provider>
                <span>Loading...</span>
            </div>
        </div>
    );
}

export default Loading;
