import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {apiUrl} from "../App";

const Post = () => {

	const {id} = useParams();
	const [postObject, setPostObject] = useState({});

	useEffect(() => {
		axios.get(`${apiUrl}/posts/byId/${id}`).then((response) => {
			setPostObject(response.data)
		})
	}, []);

	return (
		<div className={'postPage'}>
			<div className={'leftSide'}>
				<div className={'title'}>{postObject.title}</div>
				<div className="postText">{postObject.postText}</div>
				<div className="footer">{postObject.username}</div>
			</div>
			<div className="rightSide">

			</div>
		</div>
	);
};

export default Post;
