import React, {useState} from 'react';
import axios from 'axios';
import {API_URL} from "../App";
import {useHistory} from 'react-router-dom'

const Login = () => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const handleLogin = () => {
		const data = {username, password};
		axios.post(`${API_URL}/auth/login`, data)
			.then(response => {
				console.log(response.data);
				if (response.data.error) {
					alert(response.data.error);
				} else {
					sessionStorage.setItem('accessToken', response.data);
					history.push('/');
				}

			})
	}
	return (
		<div>
			<input type="text" onChange={evt => setUsername(evt.target.value)} />
			<input type="text" onChange={evt => setPassword(evt.target.value)} />
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
