"use client"

import React, { useState } from "react"; // <DraggableCore>
// import {garden} from '../data/garden'

type Props = {
	lineX: number;
	lineStatus: string;
	line: object;
	handleClick: () => void;
	scale : number
};

const Line = ({ lineX, lineStatus, handleClick, line, scale }: Props) => {
	const width = lineX * 1;
	const [displayInfo, SetDisplayInfo] = useState(false);

	const handleMouseEnter = () => {
		SetDisplayInfo(true);
	};

	const handleMouseLeave = () => {
		SetDisplayInfo(false);
	};

	return (
		<div
			className={`bg-amber-900`}
			style={{ width: lineX * scale, height: 2 * scale/100 }}
			
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			//status={status}
			onClick={handleClick}
		>
			<div
				className={`
        ${displayInfo ? "block" : "hidden"} 
        relative left-20 bg-gray-200 border-2 z-1000 flex flex-col items-start w-40`}
			>
				<h3>{line.crop.vegetable}</h3>
				<h4>{line.crop.variety}</h4>
				
				<h5>{line.status}</h5>
				<div className="flex flex-row justify-evenly w-full">
					<button className="border-2 bg-white ">❗</button>
					<button className="border-2 bg-white ">👍</button>
					<button className="border-2 bg-white ">❓</button>
				</div>
			</div>
		</div>
	);
};

export default Line;
