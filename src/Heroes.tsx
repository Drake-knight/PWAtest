import React, { useEffect, useState } from "react";
import HeroList from "./HeroList";
import Hero from "./Hero";
import axios from "axios";
const Home: React.FC = (): JSX.Element => {
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState<boolean>(true);
	const [heroes, setHeroes] = useState<Hero[] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<Hero[]>("https://tour-of-heroes-xuwa.onrender.com/heroes");
				console.log("API Data:", response.data);
				setHeroes(response.data);
				setError(null);
				setIsPending(false);
			} catch (err) {
				console.error(err);
				setError("Error fetching data");
			}
		};
		const intervalId = setInterval(fetchData, 5000);
		fetchData();
		return () => clearInterval(intervalId);
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
