"use client"
import React, { useState } from "react";
import data from "../../app/data/data";
import Parcel from "./Parcel";
import styles from "../../app/Assets.module.css";

type Props = {
	gardenId: number;
	scale: number;
};


const Garden: React.FC<Props> = ({ gardenId, scale }) => {

	//selection du bon jardin
	const garden = data.garden.filter((garden: { id: number; }) => garden.id === gardenId)
	console.log(garden)
	const gardenX = garden[0].length
	const gardenY = garden[0].width


	return (
		<section className="mb-10">

			<div
				className="bg-gardenBG m-10 relative"
				style={{
					height: gardenX * scale,
					width: gardenY * scale,
				}}>

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

<div
				className={`absolute top-0 ${styles.gardenHorizontalFence} `}
				style={{
					height: 0.3 * scale,
					width: gardenY * scale,
				}}></div>

			<div
				className={`absolute bottom-0 ${styles.gardenHorizontalFence} `}
				style={{
					height: 0.3 * scale,
					width: gardenY * scale,
				}}></div>

			<div
				className={`absolute top-0 left-0 ${styles.gardenVerticalFence} `}
				style={{
					height: gardenX * scale,
					width: 0.2 * scale,
				}}></div>

			<div
				className={`absolute top-0 right-0 ${styles.gardenVerticalFence} `}
				style={{
					height: gardenX * scale,
					width: 0.2 * scale,
				}}></div>

			</div>

			

		</section>
	);
};

export default Garden;