import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from "axios";
import {API_URL} from "../App";

const Post = () => {
	let {id} = useParams();
	const [postObj, setPostObj] = useState({});
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');

	useEffect(() => {
		axios.get(`${API_URL}/posts/byid/${id}`).then(response => {
			setPostObj(response.data);
		})

		axios.get(`${API_URL}/comments/${id}`).then(response => {
			setComments(response.data);
		})
	}, []);

	const handleAddComment = () => {
		axios.post(`${API_URL}/comments`, {
			commentBody: newComment,
			PostId: id,
		})
			.then(response => {
				const addedComment = {commentBody: newComment}
				setComments([...comments, addedComment]);
				setNewComment('');
			})
	}

	return (
		<div>
			<div className='postPage'>
				<div className='leftSide'>
					<div className="post" id='individual'>
						<div className='title'>{postObj.title}</div>
						<div className='postText'>{postObj.postText}</div>
						<div className='footer'>{postObj.username}</div>
					</div>
				</div>
				<div className='rightSide'>
					<div className='addCommentContainer'>
						<input
							type="text" placeholder='Comment...'
							value={newComment} autoComplete='off'
							onChange={(e) => {
								setNewComment(e.target.value)}}
						/>
						<button onClick={handleAddComment}>Add Comment</button>
					</div>
					<div className="listOfComments">
						{
							comments.map((comment, key) => (
								<div key={key} className='comment'>{comment.commentBody}</div>
							))
						}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
