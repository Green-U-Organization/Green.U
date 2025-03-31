"use client";
import Image from "next/image";
import React, { useState } from "react";
import ZoomSlider from "./ZoomSlider";

type Props = {
	containerName: string;
	className?: string;
	children?: React.ReactNode;
	onGardenIdChange: (gardenId: number) => void;
	onScaleChange: (scale: number) => void;
};

const GardenCardHeader = ({
	containerName,
	className,
	onGardenIdChange,
	onScaleChange,
}: Props) => {
	const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const scale = Number(e.target.value);
		onScaleChange(scale);
		console.log(scale);
	};

	const handleGardenIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const gardenId = Number(e.target.value);
		onGardenIdChange(gardenId);

		console.log(gardenId);
	};

	return (
		<>
			<section
				className={`grid grid-cols-2 grid-rows-3 items-center mt-3`}
			>
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
					>
						<option value="1">Jardin 1</option>
						<option value="2">Jardin 2</option>
						<option value="3">Jardin 3</option>
						<option value="4">Jardin 4</option>
						<option value="5">Jardin 5</option>
					</select>
				</div>
			</section>
		</>
	);
};

export default GardenCardHeader;
