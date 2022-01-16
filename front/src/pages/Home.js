import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../App";

const Home = () => {

	const [listOfPosts, setListOfPosts] = useState([]);
	const history = useHistory();

	useEffect(() => {
		axios.get(`${apiUrl}/posts`).then(response => {
			setListOfPosts(response.data);
		})
	}, []);
	return (
		<div>
			{
				listOfPosts.map((post, key) => (
					<div key={key} className={'post'} onClick={() => history.push(`/post/${post.id}`)}>
						<div className={'title'}>{post.title}</div>
						<div className={'body'}>{post.postText}</div>
						<div className={'footer'}>{post.username}</div>
					</div>
				))
			}
		</div>
	);
};

export default Home;
