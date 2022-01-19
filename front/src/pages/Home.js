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

	const handleToggleLike = (postId) => {
		axios.post(`${apiUrl}/like`, {PostId: postId}, {
			headers: {
				accessToken: localStorage.getItem('accessToken')
			}
		})
			.then(response => {
				// alert(response.data);
				setListOfPosts(listOfPosts.map(post => {
					if (post.id === postId) {
						if (response.data.liked) {
							return {...post, Likes: [...post.Likes, 0]}
						} else {
							const likeArr = post.Likes;
							likeArr.pop();
							return {...post, Likes: likeArr}
						}

					} else {
						return post;
					}
				}))
			})
	}
	return (
		<div>
			{
				listOfPosts.map((post, key) => (
					<div key={key} className={'post'} onClick={() => history.push(`/post/${post.id}`)}>
						<div className={'title'}>{post.title}</div>
						<div className={'body'}>{post.postText}</div>
						<div className={'footer'}>
							{post.username}
							<button onClick={(e) => {
								handleToggleLike(post.id);
								e.stopPropagation();
							}}>Like</button>
							<label>{post.Likes.length}</label>
						</div>
					</div>
				))
			}
		</div>
	);
};

export default Home;
