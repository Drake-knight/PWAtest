import { Link } from "react-router-dom";
import Hero from "./Hero";

const HeroList: React.FC<{ heroes: Hero[] }> = ({ heroes }): JSX.Element => {
	return (
		<div className="hero-list">
			<p>All Heroes</p>
			{heroes.map((hero) => (
				<Link className="link" to={`/change/${hero.id}`}>
					<div className="hero-preview" key={hero.id}>
						<h2>{hero.name}</h2>
					</div>
				</Link>
			))}
		</div>
	);
};

export default HeroList;
