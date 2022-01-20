import React, {useState} from 'react';
import axios from "axios";
import {apiUrl} from "../App";

const ChangePassword = () => {

	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const handleUpdatePassword = () => {
		axios.put(`${apiUrl}/auth/changepassword`,
			{
				oldPassword: oldPassword,
				newPassword: newPassword
			},
			{
				headers: {
					accessToken: localStorage.getItem('accessToken')
				}
			})
			.then(response => {
				if (response.data.error) {
					alert(response.data.error)
				}
			})
	}

	return (
		<div>
			<h1>Change your password</h1>
			<input
				type="password" placeholder={'old password'}
				value={oldPassword} onChange={evt => setOldPassword(evt.target.value)}
			/>
			<input
				type="password" placeholder={'new password'}
				value={newPassword} onChange={evt => setNewPassword(evt.target.value)}
			/>
			<button onClick={handleUpdatePassword}>Save password</button>
		</div>
	);
};

export default ChangePassword;
