"use client"
import React, { useState } from "react";
import data from "../../app/data/data";
import Parcel from "./Parcel";
import ZoomSlider from "./ZoomSlider";

type Props = {
	gardenId: number;
};


const Garden: React.FC<Props> = ({ gardenId }) => {
	const [scale, setScale] =useState(100)

const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	setScale(Number(e.target.value));
	console.log(scale)
}

	return (
		<div>
			<ZoomSlider handleChange={handleScaleChange}></ZoomSlider>
			{data.parcels.map((parcel: { id: React.Key | null | undefined; width: number; length: number; gardenId: number }) => (
				parcel.gardenId === gardenId ? (
					<div key={parcel.id}>
						<Parcel
							parcel={parcel} 
							parcelX={parcel.width}
							parcelY={parcel.length}		
							parcelID={parcel.id as number}
							scale={scale}				
						/>
					</div>
				) : null
			))}
		</div>
	);
};

export default Garden;