"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ZoomSlider from "./ZoomSlider";
import { getAllGardenByUserId } from "@/utils/actions/garden/getAllGardenByUserId";

type Props = {
	containerName: string;
	className?: string;
	children?: React.ReactNode;
	onGardenIdChange: (gardenId: number) => void;
	onScaleChange: (scale: number) => void;
};

type Garden = {
	authorId: number,
    name: string,
    description: string,
    latitude: number,
    longitude: number,
    length: number,
    width: number,
    privacy: "private" | "public"
    type: "individual" | "collective" | "professionnal",
}

const GardenCardHeader = ({
	containerName,
	className,
	onGardenIdChange,
	onScaleChange,
}: Props) => {

	const [gardens, setGardens] = useState<any[]>([]);
	const [gardenId, setGardenId] = useState<number | null>(null);
	const [selectedGarden, setSelectedGarden] = useState<Garden>();
	const [isLoading, setIsLoading] = useState<boolean>(true);


//#region FETCHING GARDEN DATA
	const fetchGardens = async () => {
		try {
			const fetchedGardens = await getAllGardenByUserId(1);
			setGardens(fetchedGardens);
			setGardenId(fetchedGardens[0]?.id || null);
		} catch (error) {
			console.error("Error fetching gardens:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchGardens();
	}, []);

	useEffect(() => {
		if (gardenId !== null) {
			setSelectedGarden(gardens.find(garden => garden.id === gardenId));
			console.log("selectedGarden : ",selectedGarden)
		}
	}, [gardenId, gardens]);

//#endregion

//#region HANDLER
	const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const scale = Number(e.target.value);
		onScaleChange(scale);
	};

	const handleGardenIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedGardenId = Number(e.target.value);
		setGardenId(selectedGardenId);
		onGardenIdChange(selectedGardenId);
	};
//#endregion


	if (isLoading) {
		return <div>Loading...</div>; 
	}

	return (
		<>
			<section className={`grid grid-cols-2 grid-rows-3 items-center mt-3 ${className}`}>
				<h1 className="text-4xl ml-4 mt-2 col-start-1 col-end-3 text-center">
					{containerName}
				</h1>

				<ZoomSlider
					handleChange={handleScaleChange}
					className="col-start-1 col-end-2 row-start-2 row-end-3"
				></ZoomSlider>

				<div className="col-start-2 col-end-3 row-start-2 row-end-3 flex justify-around mr-2">
					<Image
						className="object-contain h-8 w-8 p-1 border-1 border-black rounded-md"
						src="/image/icons/list.png"
						alt="expand"
						width={20}
						height={20}
					/>
					<Image
						className="object-contain h-8 w-8 p-1 border-1 border-black rounded-md"
						src="/image/icons/fence.png"
						alt="expand"
						width={20}
						height={20}
					/>
					<Image
						className="object-contain h-8 w-8 p-1 border-1 border-black rounded-md"
						src="/image/icons/edit.png"
						alt="expand"
						width={20}
						height={20}
					/>
				</div>

				<div className="ml-4 mb-5 col-start-1 col-end-3 row-start-3 row-end-4">
					Please choose your garden :
					<select
						onChange={handleGardenIdChange}
						name="garden"
						id="gardenId"
						value={gardenId || ''}
					>
						{gardens.map((garden, index) => (
							<option key={index} value={garden.id}>
								{garden.name}
							</option>
						))}
					</select>
					<h2>{selectedGarden ? selectedGarden.description : "No garden selected"}</h2>
				</div>
			</section>
		</>
	);
};

export default GardenCardHeader;

