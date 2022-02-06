import React from "react";
import ReactDOM from "react-dom";
import App from "./heroes/App";

ReactDOM.render(
	<React.StrictMode>
		{/* Bootstrap 5 */}
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
			rel="stylesheet"
		/>

		{/* Animate.css */}
		<link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
		/>

		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
