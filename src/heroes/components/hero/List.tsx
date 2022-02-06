import { useMemo } from "react";
import { getHeroesByPublisher } from "../../selectors/getHeroes";
import { Card } from "./Card";

interface iProps {
	publisher: ValidPublishers;
	heroes?: Array<Hero>;
}

export const List = (props: iProps) => {
	const { publisher } = props;

	const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

	return (
		<>
			<h1>Hero List - {publisher}</h1>
			<div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 animate__animated animate__fadeIn">
				{heroes.map((h) => (
					<Card key={h.id} hero={h} />
				))}
			</div>
		</>
	);
};
