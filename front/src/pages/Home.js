import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from "axios";
import StarsIcon from '@material-ui/icons/Stars';
import {apiUrl} from "../App";
import {AuthContext} from "../tools/AuthContext";

const Home = () => {

	const [listOfPosts, setListOfPosts] = useState([]);
	const [likedPosts, setLikedPosts] = useState([]);
	const history = useHistory();
	const {authState} = useContext(AuthContext)


	useEffect(() => {

		// we can delete post after login
		if (/*!authState.status*/ !localStorage.getItem('accessToken')) {
			history.push('/login')
		} else {
			axios.get(`${apiUrl}/posts`, {
				headers: {
					accessToken: localStorage.getItem('accessToken')
				}
			}).then(response => {
				setListOfPosts(response.data.listOfPosts);
				setLikedPosts(response.data.likedPosts);
				// to get the likedPost id to config the post className
				console.log(response.data.likedPosts.map(like => {return like.PostId}))
			})
		}

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

				if (likedPosts.includes(postId)) {
					setLikedPosts(likedPosts.filter(id => {return id != postId}))
				} else {
					setLikedPosts([...likedPosts, postId])
				}

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
							<StarsIcon
								className={likedPosts.includes(post.id) ? 'unlikeBttn': 'likeBttn'}
								onClick={(e) => {
									handleToggleLike(post.id);
									e.stopPropagation();
								}}
							/>
							{/*<button onClick={(e) => {
								handleToggleLike(post.id);
								e.stopPropagation();
							}}>Like</button>*/}
							<label>{post.Likes.length}</label>
						</div>
					</div>
				))
			}
		</div>
	);
};

export default Home;
