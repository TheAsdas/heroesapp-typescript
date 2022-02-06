import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHeroById, getNextHero, getPrevHero } from "../selectors/getHeroes";

const header = {
	backgroundColor: "#F7F7F7",
};

interface iProps {
	lastUrl: string;
}

export const Hero = (props: iProps) => {
	const { id } = useParams();
	const hero = useMemo(() => getHeroById(id), [id]);
	const navigate = useNavigate();
	const thisComponent = useRef<HTMLDivElement>(null);
	const animationDirection = useRef<"fadeInLeft" | "fadeInRight" | "fadeIn">(
		"fadeIn"
	);

	useEffect(() => {
		//Redirigir si el la ID del héroe es inválida
		if (!hero) navigate("/");

		//Quitar clases de animación (causa problemas en la animación si no)
		thisComponent.current?.classList.remove(
			"animate__fadeOutLeft",
			"animate__fadeOutRight",
			"animate__fadeInLeft",
			"animate__fadeInRight",
			"animate__fadeIn"
		);
		//Agregar animación de entrada definida
		thisComponent.current?.classList.add(
			`animate__${animationDirection.current}`
		);
	});

	const imgPath = `/assets/heroes/${id}.jpg`;
	const { alter_ego, characters, first_appearance, publisher, superhero } =
		hero!;

	const handleNext = useCallback(() => {
		const newId = getNextHero(id);
		if (newId) {
			//Agregar animación de salida
			thisComponent.current?.classList.add("animate__fadeOutLeft");
			//Definir animación de entrada
			animationDirection.current = "fadeInRight";
			//Redirigir 150ms después (para que la animación no se corte)
			setTimeout(() => navigate(`/hero/${newId}`), 150);
		}
	}, [id, navigate]);

	const handlePrev = useCallback(() => {
		const newId = getPrevHero(id);
		if (newId) {
			//Agregar animación de salida
			thisComponent.current?.classList.add("animate__fadeOutRight");
			//Definir animación de entrada
			animationDirection.current = "fadeInLeft";
			//Redirigir 150ms después (para que la animación no se corte)
			setTimeout(() => navigate(`/hero/${newId}`), 150);
		}
	}, [id, navigate]);

	const handleReturn = useCallback(() => {
		const location = publisher === "DC Comics" ? "/dc" : "/marvel";
		thisComponent.current?.classList.add("animate__fadeOut");
		setTimeout(() => navigate(location), 150);
	}, [navigate, publisher]);

	return (
		<div className="card animate__animated animate__faster" ref={thisComponent}>
			<div className="card-header d-flex p-0">
				<button className="btn btn-primary m-0" onClick={handlePrev}>
					{"<-"}
				</button>
				<h1 className="text-center my-3 flex-fill">{superhero}</h1>
				<button className="btn btn-primary m-0" onClick={handleNext}>
					{"->"}
				</button>
			</div>
			<div className="card-body">
				<div className="row">
					<div className="col-4">
						<img src={imgPath} alt={superhero} className="card-img" />
					</div>
					<div className="col-8">
						<ul className="list-group">
							<li className="list-group-item" style={header}>
								<b>Publicado por</b>
							</li>
							<li className="list-group-item">{publisher}</li>
							<li className="list-group-item" style={header}>
								<b>Alter ego</b>
							</li>
							<li className="list-group-item">{alter_ego}</li>
							<li className="list-group-item" style={header}>
								<b>Primera aparición</b>
							</li>
							<li className="list-group-item">{first_appearance}</li>
							{characters !== alter_ego && (
								<>
									<li className="list-group-item" style={header}>
										<b>Personajes</b>
									</li>
									{characters.split(", ").map((c) => (
										<li key={c} className="list-group-item">
											{c}
										</li>
									))}
								</>
							)}
						</ul>
						<button
							className="btn btn-outline-info mt-5"
							onClick={handleReturn}
						>
							Regresar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
