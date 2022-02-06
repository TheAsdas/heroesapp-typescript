import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import queryString from "query-string";
import { Card, CardMemo } from "../components/hero/Card";
import { getHeroesByName } from "../selectors/getHeroes";

export const Search = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { q = null } = useMemo(
		() => queryString.parse(location.search) as any,
		[location.search]
	);
	const foundHeroes = useMemo(() => (q ? getHeroesByName(q) : []), [q]);
	const [formData, handleChange, handleSubmit] = useForm(
		{
			"input-search": q ?? "",
		},
		(data) => {
			const query = data["input-search"].trim();
			if (query === "") return;
			navigate("?q=" + query);
		}
	);

	return (
		<>
			<form className="input-group" onSubmit={handleSubmit}>
				<input
					id="input-search"
					type="text"
					className="form-control form-control-lg"
					autoComplete="off"
					value={formData["input-search"]}
					onChange={handleChange}
					placeholder="Escribe el nombre del héroe..."
					required
				/>
				<button className="btn btn-primary btn-lg">Buscar</button>
			</form>
			{q && (
				<p className="text-muted">
					Encontramos {foundHeroes.length} resultado
					{foundHeroes.length > 1 && "s"}
				</p>
			)}
			<ul>
				{foundHeroes.map((hero, i) => {
					let wait = true;

					return <CardMemo hero={hero} key={hero.id} bounce />;
				})}
			</ul>
		</>
	);
};
