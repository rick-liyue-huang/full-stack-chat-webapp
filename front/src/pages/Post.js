import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../App";
import {AuthContext} from "../tools/AuthContext";

const Post = () => {

	const {id} = useParams();
	const [postObject, setPostObject] = useState({});
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');
	const history = useHistory();

	const {authState} = useContext(AuthContext)


	useEffect(() => {
		axios.get(`${apiUrl}/posts/byId/${id}`).then((response) => {
			setPostObject(response.data)
		});

		axios.get(`${apiUrl}/comments/${id}`).then(response => {
			setComments(response.data);
		});

	}, []);

	const handleAddComment = () => {
		axios
			.post(`${apiUrl}/comments`,
				{
					commentBody: newComment,
					PostId: id
				},
				{
					headers: {
						accessToken: localStorage.getItem('accessToken')
					}
				}
		).then(response => {
			if (response.data.error) {
				alert(response.data.error);
			} else {
				const comment = {commentBody: response.data.commentBody, username: response.data.username, id: response.data.id};
				setComments([...comments, comment]);
				setNewComment('')
			}

		});
	};

	const handleDeleteComment = (id) => {
		// have the authenticated status to delete comments
		axios.delete(`${apiUrl}/comments/${id}`, {
			headers: {
				accessToken: localStorage.getItem('accessToken')
			}
		})
			.then(() => {
				setComments(comments.filter((comment) => {
					return comment.id !== id;
				}));
			});
	};

	const handleDeletePost = (id) => {
		axios.delete(`${apiUrl}/posts/${id}`, {
			headers: {
				accessToken: localStorage.getItem('accessToken')
			}
		})
			.then(() => {
				history.push('/')
			})
	};

	const handleEditPost = (option) => {
		if (option === 'title') {
			const newTitle = prompt('Enter new Title: ');
			axios.put(`${apiUrl}/posts/title`,
				{
					newTitle: newTitle,
					id: id
				},
				{
					headers: {
						accessToken: localStorage.getItem('accessToken')
					}
				})
				.then(response => {
					setPostObject({...postObject, title: response.data});
				})
		} else if (option === 'postText') {
			const newText = prompt('Enter new Text: ');
			axios.put(`${apiUrl}/posts/postText`,
				{
					newText: newText,
					id: id
				},
				{
					headers: {
						accessToken: localStorage.getItem('accessToken')
					}
				})
				.then(response => setPostObject({...postObject, postText: newText}))
		}
	}

	return (
		<div className={'postPage'}>
			<div className={'leftSide'}>
				<div
					className={'title'}
					onClick={() => {
						if (authState.username === postObject.username) {
							handleEditPost('title')
						}
					}}
				>{postObject.title}</div>
				<div
					className="postText"
					onClick={() => {
						if (authState.username === postObject.username) {
							handleEditPost('postText')
						}
					}}
				>{postObject.postText}</div>
				<div className="footer">
					{postObject.username}
					{
						authState.username === postObject.username && <button onClick={() => handleDeletePost(postObject.id)}>Delete</button>
					}

				</div>
			</div>
			<div className="rightSide">
				<div className="addCommentContainer">
					<input value={newComment} type="text"
								 autoComplete='off' placeholder={'comments...'}
								 onChange={evt => setNewComment(evt.target.value)}
					/>
					<button onClick={handleAddComment}>Add Comment</button>
				</div>
				<div className="listOfComments">
					{
						comments.map((comment, key) => (
							<div key={key} className={'comment'}>
								{comment.commentBody}
								<label> Username: {comment.username}</label>
								{
									authState.username === comment.username &&
									<button
										onClick={() => handleDeleteComment(comment.id)}>Delete
									</button>
								}
							</div>
						))
					}
				</div>
			</div>
		</div>
	);
};

export default Post;
