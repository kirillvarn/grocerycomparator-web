import React, { useState, useEffect } from 'react';
import "./Error.css";

export default function Error(props) {
	return (
		<div className="error_container" onClick={() => props.onClick()}>
			<div className="error_container_info">
				<p className="info_message">Something went wrong on the server side!</p>
			</div>
			<div className="error_container_message">
				<p className='error_message'>{props.errorMsg}</p>
			</div>
		</div>
	)
}
