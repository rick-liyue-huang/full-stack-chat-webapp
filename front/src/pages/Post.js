import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../App";
import {AuthContext} from "../tools/AuthContext";

const Post = () => {

	const {id} = useParams();
	const [postObject, setPostObject] = useState({});
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');

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
			})
	}

	return (
		<div className={'postPage'}>
			<div className={'leftSide'}>
				<div className={'title'}>{postObject.title}</div>
				<div className="postText">{postObject.postText}</div>
				<div className="footer">{postObject.username}</div>
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
