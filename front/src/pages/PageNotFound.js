import React from 'react';
import {Link} from "react-router-dom";

const PageNotFound = () => {
	return (
		<div>
			<h1>page not found</h1>
			<h3>Try home page: <Link to={'/'}>Home Page</Link></h3>
		</div>
	);
};

export default PageNotFound;
