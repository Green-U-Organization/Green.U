"use client";

import Card from "@/components/UI/Card";
import Garden from "@/components/UI/Garden";
import React, { useState } from "react";
import GardenCardHeader from "@/components/UI/GardenCardHeader";
import Draggable from 'react-draggable';

const page = () => {

const [currentGardenId, setCurrentGardenId] = useState<number>(1)
const [currentScale, setCurrentScale] = useState<number>(125)

const handleGardenIdChange = (gardenId: number) => {
  setCurrentGardenId(gardenId);
}

const handleScaleChange = (scale: number) => {
  setCurrentScale(scale);
}

	return (
		<>
			<section className="flex items-center justify-center">
				<Card className="min-w-screen overflow-auto">
					<GardenCardHeader
            containerName={"Garden Manager"}
            className="p-5 flex flex-col items-center" 
            onGardenIdChange={handleGardenIdChange}
            onScaleChange={handleScaleChange}>
            </GardenCardHeader>

					<div className="overflow-x-auto max-w-full">
<Draggable>

						<Garden gardenId={currentGardenId} scale={currentScale}></Garden>
</Draggable>

					</div>
				</Card>
			</section>
		</>
	);
};

export default page;
