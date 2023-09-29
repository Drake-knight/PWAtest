import React, { useState } from "react";
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
			const response = await axios.post(
				`https://tour-of-heroes-xuwa.onrender.com/upload-image/${heroId}`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log("Image uploaded successfully:", response.data);
		} catch (error) {
			console.error("Failed to upload image:", error);
		}
	};

	return (
		<div>
			<h3>Upload Image</h3>
			<input type="file" accept="image/*" onChange={handleFileChange} />
			<button onClick={handleUpload}>Upload</button>
		</div>
	);
};

export default HeroImageUpload;
