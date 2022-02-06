import { memo, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface iProps {
	hero: Hero;
	bounce?: boolean;
}

const listHeader = {
	fontSize: "0.6rem",
	fontWeight: "bold",
	backgroundColor: "#F7F7F7",
	paddingTop: "0.2rem",
	paddingBottom: "0.2rem",
};

export const Card = (props: iProps) => {
	const { alter_ego, characters, first_appearance, id, publisher, superhero } =
		props.hero;
	const imgPath = useRef("/assets/heroes/");
	const thisComponent = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	const handleRedirect = useCallback(
		(ev: any) => {
			ev.preventDefault();
			const parent = thisComponent.current?.parentElement;
			console.log(parent);
			parent?.classList.add("animate__fadeOut");
			setTimeout(() => navigate(`/hero/${id}`), 150);
		},
		[id, navigate]
	);
	useEffect(() => {
		const component = thisComponent.current;
		if (props.bounce) {
			component?.classList.remove("animate__bounceOut");
			component?.classList.add("animate__bounceIn");
		}
		return () => {
			if (props.bounce) {
				component?.classList.add("animate__bounceOut");
				component?.classList.remove("animate__bounceIn");
			}
		};
	});

	return (
		<div
			className={`col animate__animated ${props.bounce && "animate__bounceIn"}`}
			ref={thisComponent}
		>
			<div className="card">
				<div className="row">
					<div className="col-4 pe-0">
						<img
							src={`${imgPath.current}${id}.jpg`}
							alt={superhero}
							className="card-img"
						/>
						<h5 className="card-title text-center">{superhero}</h5>
						<h6 className="card-subtitle text-muted text-center">
							{alter_ego}
						</h6>
					</div>
					<div className="col ps-0">
						<ul className="list-group list-group-flush ">
							<li className="list-group-item" style={listHeader}>
								Publicado por:
							</li>
							<li className="list-group-item">{publisher}</li>
							<li className="list-group-item" style={listHeader}>
								Primera aparición:
							</li>
							<li className="list-group-item">{first_appearance}</li>

							{alter_ego !== characters && (
								<>
									<li className="list-group-item" style={listHeader}>
										Personajes:
									</li>
									<li className="list-group-item"> {characters}</li>
								</>
							)}

							<li className="list-group-item" style={listHeader}>
								{/* <Link to={`/hero/${id}`}>
									Más info...
								</Link> */}
								<a href={`/hero/${id}`} onClick={handleRedirect}>
									Más info...
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export const CardMemo = memo(Card);
