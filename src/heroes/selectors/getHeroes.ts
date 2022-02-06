import { heroes } from "../data/heroes";

export const getHeroesByPublisher = (publisher: string) =>
	heroes.filter((hero) => hero.publisher === publisher);

export const getHeroById = (id = "") => heroes.find((hero) => hero.id === id);

/**
 * Recieves the ID of an hero, and returns the ID of the previous one, or null if it's the first one.
 */
export const getNextHero = (id = "") => {
	const heroIndex = heroes.findIndex((hero) => hero.id === id) + 1;
	if (heroIndex >= heroes.length || heroIndex === 0) return null;
	return heroes[heroIndex].id;
};

/**
 * Recieves the ID of an hero, and returns the ID of the next one, or null if it's the last one.
 */
export const getPrevHero = (id = "") => {
	const heroIndex = heroes.findIndex((hero) => hero.id === id) - 1;
	if (heroIndex <= 0) return null;
	return heroes[heroIndex].id;
};

export const getHeroesByName = (name = "") => {
	if (name === "") return [];

	const normalizedName = name.toLowerCase();
	return heroes.filter((hero) =>
		hero.superhero.toLowerCase().includes(normalizedName)
	);
};
