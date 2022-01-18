import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../App";

const Post = () => {

	const {id} = useParams();
	const [postObject, setPostObject] = useState({});
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');


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
						accessToken: sessionStorage.getItem('accessToken')
					}
				}
		).then(response => {
			if (response.data.error) {
				alert(response.data.error);
			} else {
				const comment = {commentBody: newComment};
				setComments([...comments, comment]);
				setNewComment('')
			}

		});
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
							<div key={key} className={'comment'}>{comment.commentBody}</div>
						))
					}
				</div>
			</div>
		</div>
	);
};

export default Post;
