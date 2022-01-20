import React, {useContext, useEffect} from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup';
import axios from "axios";
import {apiUrl} from "../App";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../tools/AuthContext";

const CreatePost = () => {

	const history = useHistory();
	const {authState} = useContext(AuthContext);

	const initialValues = {
		title: '',
		postText: '',
		// username: ''
	};

	useEffect(() => {
		if (/*!authState.status*/ !localStorage.getItem('accessToken')) {
			history.push('/login')
		}
	}, []);

	const validationSchema = Yup.object().shape({
		title: Yup.string().required('Need Title'),
		postText: Yup.string().required('Need Content'),
		// username: Yup.string().min(2).max(15).required('Need Username')
	})

	const handleSubmit = (data) => {

		axios.post(`${apiUrl}/posts`, data, {
			headers: {
				accessToken: localStorage.getItem('accessToken')
			}
		}).then(response => {
			console.log('it worked');
			history.push('/')
		})
	}

	return (
		<div className={'createPostPage'}>
			<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
				<Form className={'formContainer'}>
					<label htmlFor="inputCreatePost">Title: </label>
					<ErrorMessage name={'title'} component={'span'} />
					<Field id={'inputCreatePost'} name={'title'} placeholder={'title'} autoComplete={'off'} />

					<label htmlFor="inputCreatePost">Content: </label>
					<ErrorMessage name={'postText'} component={'span'} />
					<Field id={'inputCreatePost'} name={'postText'} placeholder={'content'} autoComplete={'off'} />

					<button type={'submit'}>Create Post</button>
				</Form>
			</Formik>
		</div>
	);
};

export default CreatePost;
