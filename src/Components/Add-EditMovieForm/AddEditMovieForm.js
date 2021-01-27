import React from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {Formik, ErrorMessage} from 'formik';
import {BsX} from 'react-icons/bs';
import {IconContext} from "react-icons";
import './AddEditMovieForm.scss';

const AddEditMovieForm = ({title, movieId, isOpen, openModal}) => {
    Modal.setAppElement(document.getElementById('root'));

    const animatedComponents = makeAnimated();

    const options = [
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

    const colors = {
        red       : '#F65261',
        mid_grey  : '#424242',
        white     : '#FFFFFF',
        light_grey: '#555555'
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

    const customStyles = {
        control: () => ({
            backgroundColor: colors.light_grey,
            color: colors.white,
            display: 'flex',
            borderRadius: '5px',
            padding: '5px 0px'
        }),
        multiValue: (styles, { data }) => {
            return {
                ...styles,
                backgroundColor: colors.mid_grey,
                borderRadius: '5px'
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: colors.white,
            fontSize: '15px',
            opacity: '0.8',
            fontWeight: '400'
        }),
        clearIndicator: (styles, {data}) => ({
            ...styles,
            '&:hover': {
                color: colors.red
            }
        }),
        dropdownIndicator: (styles, {data}) => ({
            ...styles,
            '&:hover': {
                color: colors.red
            }
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: colors.light_grey,
            color: colors.white,
            borderRadius: '5px',
            '&:hover': {
                backgroundColor: colors.red
            }
        }),
        menu: (provided, state) => ({
            ...provided,
            backgroundColor: colors.light_grey
        })
    }

    return (
        <Modal isOpen={isOpen} className='modal' overlayClassName="modal-overlay">
            <header>
                <h2>{title}</h2>
                <IconContext.Provider value={{className: "close-icon"}}>
                    <BsX onClick={() => openModal(false)}/>
                </IconContext.Provider>
            </header>
            
            <Formik
                initialValues={{title: '', release_date: '', movie_url: '', genres: [], overview: '', runtime: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.title){
                        errors.title = 'Required';
                    }
                    if (!values.release_date){
                        errors.release_date = 'Required';
                    }
                    if (!values.movie_url){
                        errors.movie_url = 'Required';
                    }
                    if (!values.genre){
                        errors.genre = 'Select at least one genre to proceed'
                    }
                    if (!values.overview){
                        errors.overview = 'Required';
                    }
                    if (!values.runtime){
                        errors.runtime = 'Required';
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

                        <label htmlFor="movie_url">RELEASE DATE</label>
                        <input type='text' name='movie_url' value={values.movie_url} onChange={handleChange} onBlur={handleBlur} placeholder="Movie URL Here"></input>
                        <ErrorMessage name="movie_url" component="div" className='error-message'/>

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