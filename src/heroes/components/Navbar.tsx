import { Link, NavLink, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		navigate("/login", {
			replace: true,
		});
	};

	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
			<Link className="navbar-brand ms-3" to="/">
				HeroesApp
			</Link>

			<div className="navbar-collapse">
				<div className="navbar-nav">
					<NavLink
						className={({ isActive }) =>
							`nav-item nav-link ${isActive && "active"}`
						}
						end
						to="/marvel"
					>
						Marvel
					</NavLink>

					<NavLink
						className={({ isActive }) =>
							`nav-item nav-link ${isActive && "active"}`
						}
						end
						to="/dc"
					>
						DC
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							`nav-item nav-link ${isActive && "active"}`
						}
						end
						to="/search"
					>
						Buscar
					</NavLink>
				</div>
			</div>

			<div className="navbar-collapse collapse w-100 order-3 dual-collapse2 justify-content-end">
				<span className="nav-item nav-link">Gustavo</span>
				<ul className="navbar-nav ml-auto">
					<NavLink
						onClick={handleLogout}
						className={({ isActive }) =>
							`nav-item nav-link me-3 ${isActive && "active"}`
						}
						end
						to="/login"
					>
						Logout
					</NavLink>
				</ul>
			</div>
		</nav>
	);
};
