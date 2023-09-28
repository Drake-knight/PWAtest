import React, { FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Hero from "./Hero";
import axios from "axios";

const ChangeName: React.FC = (): JSX.Element => {
	const { id } = useParams();
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState<boolean>(true);
	const [hero, setHero] = useState<Hero | null>(null);

	const [newName, setNewName] = useState<string>("");
	const history = useNavigate();
	const [putError, setPutError] = useState<string | null>(null);

	useEffect(() => {
		axios
			.get<Hero>(`https://tour-of-heroes-xuwa.onrender.com/heroes/${id}`)
			.then((response) => {
				setHero(response.data);
				setIsPending(false);
			})
			.catch((err) => {
				setError("Error fetching data");
				setIsPending(false);
			});
	}, [id]);

	const sendNameChangeNotification = async (newHeroName: any) => {
		if ("PushManager" in window && "serviceWorker" in navigator) {
			const registration = await navigator.serviceWorker.getRegistration();

			if (registration && registration.active) {
				const message = {
					type: "nameChangeNotification",
					data: newHeroName,
				};
				registration.active.postMessage(message);
			}
		}
	};
	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			console.log("Submitting PUT request:");
			console.log("ID:", id);
			console.log("New Name:", newName);
			sendNameChangeNotification(newName);
			const response = await axios.put(
				`https://tour-of-heroes-xuwa.onrender.com/change/${id}`,
				{ newName },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log("PUT Response:", response);
			history(-1);
		} catch (err: any) {
			setPutError(err.message);
		}
	};

	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				title: `Hero name`,
				text: `Hey it's ${hero?.name}`,
				url: `${hero?.id}`,
			});
		} else {
			console.log("web-api not supported");
		}
	};

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div className="change-name">
			<h2>Change name of {hero?.name}</h2>
			<form onSubmit={handleSubmit}>
				<label>New Name:</label>
				{error && <div>{error}</div>}
				<input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} />
				{!isPending && <button id="change-name-button">Change Name</button>}
				{isPending && <button disabled>Changing</button>}
			</form>
			<button id="shareButton" className="modal-button" onClick={handleShare}>
				Share Hero
			</button>

			{putError && <div>{putError}</div>}
		</div>
	);
};

export default ChangeName;
