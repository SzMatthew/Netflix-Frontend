import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import StatusResponseModal from '../StatusResponseModal/StatusResponseModal';
import {Formik, Form, ErrorMessage} from 'formik';
import MultiSelect from "../MultiSelect/MultiSelect";
import {BsX} from 'react-icons/bs';
import {IconContext} from "react-icons";
import './AddEditMovieForm.scss';

const AddEditMovieForm = ({title, movieId, isOpen, openModal}) => {
    const options = [
        {label: 'Action', value: 'Action'},
        {label: 'Adventure', value: 'Adventure'},
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

    const [movieObj, setMovieObj] = useState({title: '', tagline: '', release_date: '', vote_average: '', poster_path: '', genres: [], overview: '', budget: '', runtime: ''});
    
    const [statusResponseModalOpen, setStatusResponseModalOpen] = useState(false);
    const [fetchIsSuccessfull, setFetchIsSuccessfull] = useState(false);

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

    const ValidateForm = (values) => {
        const errors = {};
        if (!values.title){
            errors.title = 'Required';
        }
        if (!values.release_date){
            errors.release_date = 'Required';
        }
        if (!values.vote_average)
        {
            errors.vote_average = 'Required';
        }
        else if (!/^[0-9.]+$/i.test(values.vote_average))
        {
            errors.vote_average = 'Score only takes numbers and dot!'
        }
        if (!values.poster_path){
            errors.poster_path = 'Required';
        }    
        if (values.genres.length === 0){
            errors.genres = 'Required';
        }
        if (!values.overview){
            errors.overview = 'Required';
        }
        if (!/^[0-9]+$/i.test(values.budget) && values.budget){
            errors.budget = 'Budget only takes numbers!';
        }
        if (!values.runtime) {
            errors.runtime = 'Required';
        }
        else if (!/^[0-9]+$/i.test(values.runtime)){
            errors.runtime = 'Runtime only takes numbers!';
        }
        return errors;
    }

    const EditMovie = values => {
        values.id = movieId;

        fetch("http://localhost:4000/movies", {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(() => {
                openModal(false);
                setFetchIsSuccessfull(true);
                setStatusResponseModalOpen(true);
            })
            .catch((error) => {
                setFetchIsSuccessfull(false);
                setStatusResponseModalOpen(true);
            });
    }

    const UploadMovie = values => {
        fetch("http://localhost:4000/movies", {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(() => {
                openModal(false);
                setFetchIsSuccessfull(true);
                setStatusResponseModalOpen(true);
            })
            .catch((error) => {
                setFetchIsSuccessfull(false);
                setStatusResponseModalOpen(true);
            });
    }

    return (
        <>
            <Modal isOpen={isOpen} className='modal add-edit-modal' overlayClassName="modal-overlay" closeTimeoutMS={350}>
                <header >
                    <h2>{title}</h2>
                    <IconContext.Provider value={{className: "close-icon"}}>
                        <BsX onClick={() => openModal(false)}/>
                    </IconContext.Provider>
                </header>
                
                <Formik
                    initialValues={movieObj}
                    validate={values => ValidateForm(values)}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            values.runtime = parseInt(values.runtime);
                            values.vote_average = parseFloat(values.vote_average);
                            if (values.tagline === ''){
                                delete values.tagline;
                            }
                            if (values.budget === ''){
                                delete values.budget;
                            }

                            movieId
                                ? EditMovie(values)
                                : UploadMovie(values)
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({values, handleChange, handleBlur, handleReset, handleSubmit, isSubmitting, setFieldValue}) => (
                        <Form onSubmit={handleSubmit}>
                            <MovieIdFormGroup />
                            <label htmlFor="title">TITLE*</label>
                            <input type='text' name='title' value={values.title} onChange={handleChange} onBlur={handleBlur} placeholder="Title here"></input>
                            <ErrorMessage name="title" component="div" className='error-message' />
                            
                            <label htmlFor="tagline">TAGLINE</label>
                            <input type='text' name='tagline' value={values.tagline} onChange={handleChange} placeholder="Tagline here"></input>

                            <label htmlFor="release_date">RELEASE DATE*</label>
                            <input type='date' name='release_date' value={values.release_date} onChange={handleChange} onBlur={handleBlur} placeholder="Select Date"></input>
                            <ErrorMessage name="release_date" component="div" className='error-message' />
                            
                            <label htmlFor="vote_average">SCORE*</label>
                            <input type='text' name='vote_average' value={values.vote_average} onChange={handleChange} onBlur={handleBlur} placeholder="Score here"></input>
                            <ErrorMessage name="vote_average" component="div" className='error-message'/>

                            <label htmlFor="poster_path">POSTER URL*</label>
                            <input type='text' name='poster_path' value={values.poster_path} onChange={handleChange} onBlur={handleBlur} placeholder="Poster URL Here"></input>
                            <ErrorMessage name="poster_path" component="div" className='error-message'/>

                            <label htmlFor="genres">GENRES*</label>
                            <MultiSelect name="genres" options={options} values={values.genres} customOnBlur={() =>handleBlur} onChange={value => setFieldValue('genres', value)}/>
                            <ErrorMessage name="genres" component="div" className='error-message'/>

                            <label htmlFor="overview">OVERVIEW*</label>
                            <input type='text' name='overview' value={values.overview} onChange={handleChange} onBlur={handleBlur} placeholder="Overview Text Goes Here"></input>
                            <ErrorMessage name="overview" component="div" className='error-message' />
                            
                            <label htmlFor="budget">BUDGET</label>
                            <input type='text' name='budget' value={values.budget} onChange={handleChange} onBlur={handleBlur} placeholder="Budget Goes Here"></input>
                            <ErrorMessage name="budget" component="div" className='error-message'/>

                            <label htmlFor="runtime">RUNTIME*</label>
                            <input type='text' name='runtime' value={values.runtime} onChange={handleChange} onBlur={handleBlur} placeholder="Runtime Text Goes Here"></input>
                            <ErrorMessage name="runtime" component="div" className='error-message'/>

                            <footer>
                                <button className="red-border" disabled={isSubmitting} onClick={handleReset}>RESET</button>
                                <button type='button' className="red" disabled={isSubmitting} onClick={handleSubmit}>{movieId ? 'SAVE' : 'SUBMIT'}</button>
                            </footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
            <StatusResponseModal type={fetchIsSuccessfull ? 1 : 2} isOpen={statusResponseModalOpen} openModal={(isOpen) => setStatusResponseModalOpen(isOpen)}/>
        </>
    );
    
}

export default AddEditMovieForm;