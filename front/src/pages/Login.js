import React, {useState} from 'react';
import axios from "axios";
import {apiUrl} from "../App";

const Login = () => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		const data = {username: username, password: password};
		axios.post(`${apiUrl}/auth/login`, data)
			.then(response => {
				console.log(response.data);
			})
	};

	return (
		<div>
			<input type="text" value={username} onChange={evt => setUsername(evt.target.value)} />
			<input type="password" value={password} onChange={evt => setPassword(evt.target.value)} />
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
