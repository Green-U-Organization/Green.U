"use client"
import React, { useState } from "react";
import Line from "./Line";
import data from "../../app/data/data";

type Props = {
    parcel : object;
    parcelX : number; 
    parcelY : number;
    parcelID : number;
    scale : number
}

const Bed = ({parcel, parcelX, parcelY, parcelID, scale} : Props) => {



    const handleClick = (e) => {
        console.log(e)
    }



// console.log("id: ", parcel.id)
	return (
		<div className="flex m-5">
            <div 
            className={`bg-amber-200 flex flex-col justify-around`} 
            style={{height : parcelX*scale, width : parcelY*scale}}
            >

	{
        data.lines.map((line) => (
            line.parcelId === parcelID ? (                
                <Line 
                key={line.id}
                line={line}
                lineX={line.length}
                lineStatus={line.status}
                handleClick={handleClick}
                scale={scale}/>                       
            ) : null
        
        ))
        

            }
{/* <p>id : {parcel.id} length : {parcel.length} width : {parcel.width}</p> */}


            </div>
		</div>
	);
};

export default Bed;