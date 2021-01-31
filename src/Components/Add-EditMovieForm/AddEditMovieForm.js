import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {Formik, ErrorMessage} from 'formik';
import {BsX} from 'react-icons/bs';
import {IconContext} from "react-icons";
import './AddEditMovieForm.scss';

const AddEditMovieForm = ({title, movieId, isOpen, openModal}) => {
    const animatedComponents = makeAnimated();
    const options            = [
        {label: 'Action', value: 'Action'},
        {label: 'Advanture', value: 'Advanture'},
        {label: 'Science Fiction', value: 'Science Fiction'},
        {label: 'Fantasy', value: 'Fantasy'},
        {label: 'Documentary', value: 'Documentary'},
        {label: 'Comedy', value: 'Comedy'},
        {label: 'Horror', value: 'Horror'},
        {label: 'Crime', value: 'Crime'},
        {label: 'Thriller', value: 'Thriller'},
        {label: 'Drama', value: 'Drama'},
        {label: 'Mystery', value: 'Mystery'},
        {label: 'History', value: 'History'}
    ];
    const styleColors = {
        red: '#F65261',
        mid_grey: '#424242',
        white: '#FFFFFF',
        light_grey: '#555555'
    };
    const customStyles = {
        control: () => ({
            backgroundColor: styleColors.light_grey,
            color: styleColors.white,
            display: 'flex',
            borderRadius: '5px',
            padding: '5px 0px'
        }),
        multiValue: styles => {
            return {
                ...styles,
                backgroundColor: styleColors.mid_grey,
                borderRadius: '5px'
            };
        },
        multiValueLabel: styles => ({
            ...styles,
            color: styleColors.white,
            fontSize: '15px',
            opacity: '0.8',
            fontWeight: '400'
        }),
        clearIndicator: styles => ({
            ...styles,
            '&:hover': {
                color: styleColors.red
            }
        }),
        dropdownIndicator: styles => ({
            ...styles,
            '&:hover': {
                color: styleColors.red
            }
        }),
        option: provided => ({
            ...provided,
            backgroundColor: styleColors.light_grey,
            color: styleColors.white,
            borderRadius: '5px',
            '&:hover': {
                backgroundColor: styleColors.red
            }
        }),
        menu: provided => ({
            ...provided,
            backgroundColor: styleColors.light_grey
        })
    };

    const [movieObj, setMovieObj] = useState({title: '', release_date: '', poster_path: '', genres: [], overview: '', runtime: ''});

    Modal.setAppElement(document.getElementById('root'));

    useEffect(() => getMovie(), [movieId]);

    const getMovie = () => {
        if (movieId)
        {
            fetch("http://localhost:4000/movies/" + movieId)
			.then((res) => res.json())
			.then((result) => {
				setMovieObj(result);
			});
        }
    }

    const MovieIdFormGroup = () => {
        if (movieId){
            return (
                <>
                    <label htmlFor="title">MOVIE ID</label>
                    <span className="movieId">{movieId}</span>
                </>
            );
        } else {
            return null;
        }
    }

    return (
        <Modal isOpen={isOpen} className='modal' overlayClassName="modal-overlay" closeTimeoutMS={350}>
            <header>
                <h2>{title}</h2>
                <IconContext.Provider value={{className: "close-icon"}}>
                    <BsX onClick={() => openModal(false)}/>
                </IconContext.Provider>
            </header>
            
            <Formik
                initialValues={movieObj}
                validate={values => {
                    const errors = {};
                    if (!values.title){
                        errors.title = 'Required';
                    }
                    if (!values.release_date){
                        errors.release_date = 'Required';
                    }
                    if (!values.poster_path){
                        errors.poster_path = 'Required';
                    }
                    if (!values.genre){
                        errors.genre = 'Select at least one genre to proceed'
                    }
                    if (!values.overview){
                        errors.overview = 'Required';
                    }
                    if (!values.runtime){
                        errors.runtime = 'Required';
                    } else if (!/^[0-9]+$/i.test(values.runtime)){
                        errors.runtime = 'Runtime only takes numbers!';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                    }}
            >
                {({values, handleChange, handleBlur, handleReset, handleSubmit, isSubmitting,}) => (
                    <form onSubmit={handleSubmit}>
                        <MovieIdFormGroup />
                        
                        <label htmlFor="title">TITLE</label>
                        <input type='text' name='title' value={values.title} onChange={handleChange} onBlur={handleBlur} placeholder="Title here"></input>
                        <ErrorMessage name="title" component="div" className='error-message'/>

                        <label htmlFor="release_date">RELEASE DATE</label>
                        <input type='date' name='release_date' value={values.release_date} onChange={handleChange} onBlur={handleBlur} placeholder="Select Date"></input>
                        <ErrorMessage name="release_date" component="div" className='error-message'/>

                        <label htmlFor="poster_path">POSTER URL</label>
                        <input type='text' name='poster_path' value={values.poster_path} onChange={handleChange} onBlur={handleBlur} placeholder="Poster URL Here"></input>
                        <ErrorMessage name="poster_path" component="div" className='error-message'/>

                        <label htmlFor="genres">GENRES</label>
                        <Select isMulti closeMenuOnSelect={false} components={animatedComponents} styles={customStyles} name='genres' options={options}></Select>
                        <ErrorMessage name="genres" component="div" className='error-message'/>

                        <label htmlFor="overview">OVERVIEW</label>
                        <input type='text' name='overview' value={values.overview} onChange={handleChange} onBlur={handleBlur} placeholder="Overview Text Goes Here"></input>
                        <ErrorMessage name="overview" component="div" className='error-message'/>

                        <label htmlFor="runtime">RUNTIME</label>
                        <input type='text' name='runtime' value={values.runtime} onChange={handleChange} onBlur={handleBlur} placeholder="Runtime Text Goes Here"></input>
                        <ErrorMessage name="runtime" component="div" className='error-message'/>

                        <footer>
                            <button className="red-border" disabled={isSubmitting} onClick={handleReset}>RESET</button>
                            <button type='button' className="red" disabled={isSubmitting} onClick={handleSubmit}>{movieId ? 'SAVE' : 'SUBMIT'}</button>
                        </footer>
                    </form>
                )}
            </Formik>
        </Modal>
    );
    
}

export default AddEditMovieForm;