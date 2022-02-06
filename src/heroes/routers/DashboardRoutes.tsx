import { useRef } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { DC, Hero, Marvel, Search } from "../pages";

export const DashboardRoutes = () => {
	const urlPath = useRef(window.location.pathname);

	return (
		<>
			<Navbar />
			<div className="container my-5">
				<Routes>
					<Route path="/" element={<Marvel />} />
					<Route path="/dc" element={<DC />} />
					<Route path="/marvel" element={<Marvel />} />
					<Route path="/search" element={<Search />} />
					<Route path="/hero/:id" element={<Hero lastUrl={urlPath.current} />} />
				</Routes>
			</div>
		</>
	);
};
