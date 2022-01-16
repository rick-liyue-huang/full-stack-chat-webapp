import React, {useEffect, useState} from 'react';
import axios from "axios";
import {apiUrl} from "../App";

const Home = () => {

	const [listOfPosts, setListOfPosts] = useState([]);

	useEffect(() => {
		axios.get(`${apiUrl}/posts`).then(response => {
			setListOfPosts(response.data);
		})
	}, []);
	return (
		<div>
			{
				listOfPosts.map((post, key) => (
					<div key={key} className={'post'}>
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
