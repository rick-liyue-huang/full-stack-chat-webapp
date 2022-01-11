import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import {API_URL} from "../App";

const Home = () => {

	const [listOfPosts, setListOfPosts] = useState([]);
	let history = useHistory();

	useEffect(() => {
		axios.get(`${API_URL}/posts`)
			.then((response) => {
				setListOfPosts(response.data);
			})
	}, []);
	return (
		<div>
			{
				listOfPosts.map((post) => (
					<div className="post" key={post.id} onClick={() => {history.push(`/post/${post.id}`)}}>
						<div className='title'>{post.title}</div>
						<div className="body">{post.postText}</div>
						<div className="footer">{post.username}</div>
					</div>
				))
			}
		</div>
	);
};

export default Home;
