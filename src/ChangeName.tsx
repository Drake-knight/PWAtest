import React, { FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Hero from "./Hero";
import axios from "axios";
import { getFirebaseToken } from "./firebase"; // Assuming you have the correct Firebase setup

const ChangeName: React.FC = (): JSX.Element => {
	const { id } = useParams();
	const [error, setError] = useState<string | null>(null);
	const [isPending, setIsPending] = useState<boolean>(true);
	const [hero, setHero] = useState<Hero | null>(null);
	const [newName, setNewName] = useState<string>("");
	const history = useNavigate();
	const [putError, setPutError] = useState<string | null>(null);
	const [fcmToken, setFcmToken] = useState<string | null>(null);
	const [notificationSent, setNotificationSent] = useState<boolean>(false);

	useEffect(() => {
		const handleGetFirebaseToken = async () => {
			try {
				const firebaseToken = await getFirebaseToken();
				setFcmToken(firebaseToken);
				console.log("Firebase token:", firebaseToken);
			} catch (err) {
				console.error("An error occurred while retrieving Firebase token.", err);
			}
		};

		const fetchData = async () => {
			try {
				const response = await axios.get<Hero>(`https://tour-of-heroes-xuwa.onrender.com/heroes/${id}`);
				setHero(response.data);
				setIsPending(false);
			} catch (err) {
				setError("Error fetching data");
				setIsPending(false);
			}
		};

		handleGetFirebaseToken();
		fetchData();
	}, [id]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			console.log("Submitting PUT request:");
			console.log("ID:", id);
			console.log("New Name:", newName);

			const response = await axios.put(
				`http://localhost:8000/change/${id}`,
				{ newName },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			console.log("PUT Response:", response);

			if (!notificationSent) {
				sendNotification();
				setNotificationSent(true);
			}

			history(-1);
		} catch (err: any) {
			setPutError(err.message);
		}
	};

	const sendNotification = async () => {
		if (fcmToken) {
			try {
				const notification = {
					title: "Name Changed",
					body: `The name of hero ${hero?.name || ""} has been changed to ${newName}`,
				};

				await fetch("https://fcm.googleapis.com/fcm/send", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `key=AAAAVKWap9g:APA91bFFnHq31l-JfEYDiW4G_6Xb6ttVwZkIXMGzJaOfYkVlRV0JL_CCrSWHTQLOeRjj_C8fJRI_UjOxzQ43VTZijAASTktff2CLeen25SDGemE3Nxdp09hEyLAXC0r0rcesWCW4Blqf`,
					},
					body: JSON.stringify({
						to: fcmToken,
						notification,
					}),
				});

				console.log("Notification sent successfully");
			} catch (err) {
				console.error("An error occurred while sending the notification.", err);
			}
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
		</div>
	);
};

export default ChangeName;
