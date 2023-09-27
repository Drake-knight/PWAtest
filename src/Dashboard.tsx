import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "./Hero";
import { Link } from "react-router-dom";

const Dashboard: React.FC = (): JSX.Element => {
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<Hero[]>("https://tour-of-heroes-xuwa.onrender.com/heroes");
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
		<div className="hero-details">
			{isPending && <div>Loading...</div>}
			{error && <div>{error}</div>}

			{!isPending && heroes.length > 0 && (
				<div className="hero-list">
					<p>Top 4 Heroes</p>
					{heroes.slice(0, 4).map((hero) => (
						<Link className="link" to={`/change/${hero.id}`}>
							<div className="hero-preview" key={hero.id}>
								<h2>{hero.name}</h2>
							</div>
						</Link>
					))}
				</div>
			)}

			{!isPending && heroes.length === 0 && <div>No heroes available.</div>}
		</div>
	);
};

export default Dashboard;
