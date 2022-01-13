import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {API_URL} from "../App";

const Register = () => {
	const initialValues = {
		username: '',
		password: ''
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string().min(2).max(15).required(),
		password: Yup.string().min(4).max(20).required()
	});

	const handleSubmit = (data) => {
		axios.post(`${API_URL}/auth`, data)
			.then(() => {
				console.log(data)
			})
	}

	return (
		<div className='createPostPage'>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				<Form className='formContainer'>
					<label htmlFor='inputCreatePost'>Username: </label>
					<ErrorMessage name='username' component='span' />
					<Field id='inputCreatePost' autoComplete='off' name='username' placeholder='username' />
					<label htmlFor='inputCreatePost'>Password: </label>
					<ErrorMessage name='password' component='span' />
					<Field id='inputCreatePost' autoComplete='off' type={'password'} name='password' placeholder='password' />
					<button type='submit'>Register</button>
				</Form>
			</Formik>
		</div>
	);
};

export default Register;
