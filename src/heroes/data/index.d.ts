type Hero = {
	id: string;
	superhero: string;
	publisher: ValidPublishers;
	alter_ego: string;
	first_appearance: string;
	characters: string;
};

type ValidPublishers = "Marvel Comics" | "DC Comics";
