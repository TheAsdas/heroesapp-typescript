import { useNavigate } from "react-router-dom";

export const Login = () => {
	const navigate = useNavigate();
	const handleLogin = () => {
		navigate("/", {
			replace: true,
		});
		console.log("login");
	};

	return (
		<div className="container">
			<div className="card mt-5">
				<h1 className="card-header">Login</h1>
				<button className="btn btn-primary m-3" onClick={handleLogin}>
					Login
				</button>
			</div>
		</div>
	);
};
