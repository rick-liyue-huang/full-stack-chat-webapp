import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../App";
import {AuthContext} from "../tools/AuthContext";

const Login = () => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	const {setAuthState} = useContext(AuthContext);

	const handleLogin = () => {
		const data = {username: username, password: password};
		axios.post(`${apiUrl}/auth/login`, data)
			.then(response => {
				// console.log(response.data);
				if (response.data.error) {
					alert(response.data.error);
				} else {
					localStorage.setItem('accessToken', response.data.token);
					setAuthState({username: response.data.username, id: response.data.id, status: true});
					history.push('/');
				}
			})
	};

	return (
		<div className={'loginContainer'}>
			<label>Username: </label>
			<input type="text" value={username} onChange={evt => setUsername(evt.target.value)} />
			<label>Password: </label>
			<input type="password" value={password} onChange={evt => setPassword(evt.target.value)} />
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
