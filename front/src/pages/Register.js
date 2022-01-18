import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import axios from "axios";
import {apiUrl} from "../App";

const Register = () => {

	const initialValues = {
		username: '',
		password: ''
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string().min(2).max(15).required('Need Username'),
		password: Yup.string().min(3).max(30).required('Need Password')
	});

	const handleSubmit = (data) => {
		axios.post(`${apiUrl}/auth`, data)
			.then(response => {
				console.log(data);
			});
	}

	return (
		<div>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				<Form className={'formContainer'}>
					<label htmlFor="inputCreatePost">Username: </label>
					<ErrorMessage name={'username'} component={'span'} />
					<Field id={'inputCreatePost'} name={'username'} placeholder={'username'} autoComplete={'off'} />

					<label htmlFor="inputCreatePost">Password: </label>
					<ErrorMessage name={'password'} component={'span'} />
					<Field id={'inputCreatePost'} type={'password'}
								 name={'password'} placeholder={'password'} autoComplete={'off'}
					/>

					<button type={'submit'}>Register</button>
				</Form>
			</Formik>
		</div>
	);
};

export default Register;
