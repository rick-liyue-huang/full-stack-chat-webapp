import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../App";
import StarsIcon from "@material-ui/icons/Stars";

const Profile = () => {
	const {id} = useParams();
	const history = useHistory();
	const [username, setUsername] = useState('');
	const [listOfPosts, setListOfPosts] = useState([]);

	useEffect(() => {
		axios.get(`${apiUrl}/auth/basicinfo/${id}`)
			.then(response => {
				setUsername(response.data.username)
			});
		axios.get(`${apiUrl}/posts/byuserId/${id}`)
			.then(response => {
				setListOfPosts(response.data)
			})
	}, [])
	return (
		<div className={'profilePageContainer'}>
			<div className={'basicInfo'}>
				<h1>
					Username: {username}
				</h1>
			</div>
			<div className="listOfPosts">
				{
					listOfPosts.map((post, key) => (
						<div key={key} className={'post'}>
							<div className={'title'}>{post.title}</div>
							<div className={'body'}>{post.postText}</div>
							<div className={'footer'}>
								<div className="username">{post.username}</div>
								<div className="buttons">
									<label>{post.Likes.length}</label>
								</div>
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
};

export default Profile;
