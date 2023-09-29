import React, { useState, useEffect } from "react";
import axios from "axios";

interface HeroImageUploadProps {
	heroId: number;
}

const HeroImageUpload: React.FC<HeroImageUploadProps> = ({ heroId }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			alert("Please select an image to upload.");
			return;
		}

		const formData = new FormData();
		formData.append("image", selectedFile);

		try {
			const response = await axios.post(`http://localhost:8000/upload-image/${heroId}`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			console.log("Image uploaded successfully:", response.data);

			alert("Image uploaded successfully!");

			setSelectedFile(null);
		} catch (error) {
			console.error("Failed to upload image:", error);
			alert("Failed to upload image.");
		}
	};

	useEffect(() => {
		// Listen for the "share" event
		const handleShare = async (event: any) => {
			if (event.share) {
				// Handle shared data (e.g., files)
				const sharedFiles = event.files;
				if (sharedFiles && sharedFiles.length > 0) {
					// Assuming only one file is shared
					const sharedFile = sharedFiles[0];
					setSelectedFile(sharedFile);
				}
			}
		};

		window.addEventListener("share", handleShare);

		return () => {
			window.removeEventListener("share", handleShare);
		};
	}, []);

	return (
		<div>
			<h3>Upload Image</h3>
			<input type="file" accept="image/*" onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>
		</div>
	);
};

HeroImageUpload.defaultProps = {
	heroId: 0,
};

export default HeroImageUpload;
