import React, { useEffect, useState } from "react";
import HeroList from "./HeroList";
import Hero from "./Hero";
import axios from "axios";
const Home: React.FC = (): JSX.Element => {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState<boolean>(true);
	const [heroes, setHeroes] = useState<Hero[] | null>(null);

	useEffect(() => {
		axios
			.get<Hero[]>("http://localhost:5000/heroes")
			.then((response) => {
				setHeroes(response.data);
				setIsPending(false);
			})
			.catch((err) => {
				setError("Error fetching data");
				setIsPending(false);
			});
	}, []);

	return (
		<div className="home">
			{error && <div>{error}</div>}
			{isPending && <div>Loading...</div>}
			{heroes && <HeroList heroes={heroes} />}
		</div>
	);
};

export default Home;
