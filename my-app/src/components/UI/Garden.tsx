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
				className="bg-gardenBG relative"
				style={{
					height: gardenX * scale,
					width: gardenY * scale,
				}}>

					{/* //GRASS  */}
				<div className={`absolute top-0 ${styles.grassBG} z-0`}
					style={{
						
						height: gardenX * scale,
						width: gardenY * scale,
					}}></div>

{/* //TOP Fence */}
				<div
					className={`absolute top-0 ${styles.gardenHorizontalFence} z-20 `}
					style={{
						height: 0.3 * scale,
						width: gardenY * scale,
					}}></div>
{/* //BOTTOM Fence */}
				<div
					className={`absolute bottom-0 ${styles.gardenHorizontalFence} z-20 `}
					style={{
						height: 0.3 * scale,
						width: gardenY * scale,
					}}></div>
{/* //LEFT Fence */}
				<div
					className={`absolute top-0 left-0 ${styles.gardenVerticalFence} z-20 `}
					style={{
						height: gardenX * scale,
						width: 0.2 * scale,
					}}></div>
{/* //RIGHT Fence */}
				<div
					className={`absolute top-0 right-0 ${styles.gardenVerticalFence} z-20 `}
					style={{
						height: gardenX * scale,
						width: 0.2 * scale,
					}}></div>

				{data.parcels.map((parcel: { id: React.Key | null | undefined; width: number; length: number; gardenId: number }) => (
					parcel.gardenId === gardenId ? (
						<div 
						className="z-10 relative"
						key={parcel.id}>
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



		</section>
	);
};

export default Garden;