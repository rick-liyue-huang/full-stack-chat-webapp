import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {API_URL} from "../App";
import {useHistory} from "react-router-dom";

const CreatePost = () => {

	let history = useHistory();
	const initialValues = {
		title: '',
		postText: '',
		username: ''
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required('You must input title'),
		postText: Yup.string().required('You must input text'),
		username: Yup.string().min(2).max(15).required()
	});

	const handleSubmit = (data) => {
		console.log(data);
		axios.post(`${API_URL}/posts`, data).then(response => {
			console.log('worked');
			history.push('/');
		})
	}

	return (
		<div className='createPostPage'>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				<Form className='formContainer'>
					<label htmlFor='inputCreatePost'>Title: </label>
					<ErrorMessage name='title' component='span' />
					<Field id='inputCreatePost' autoComplete='off' name='title' placeholder='title' />
					<label htmlFor='inputCreatePost'>PostText: </label>
					<ErrorMessage name='postText' component='span' />
					<Field id='inputCreatePost' autoComplete='off' name='postText' placeholder='postText' />
					<label htmlFor='inputCreatePost'>Username: </label>
					<ErrorMessage name='username' component='span' />
					<Field id='inputCreatePost' autoComplete='off' name='username' placeholder='username' />
					<button type='submit'>Create Post</button>
				</Form>
			</Formik>
		</div>
	);
};

export default CreatePost;
