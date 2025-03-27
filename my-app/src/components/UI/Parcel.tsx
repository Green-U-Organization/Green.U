"use client"
import React from "react";
import Line from "./Line";
import data from "../../app/data/data";

const Bed = ({parcel, parcelX, parcelY, parcelID}) => {

    const handleClick = (e) => {
        console.log(e)
    }

console.log("width : ", parcelX)

//TODO AJUSTER ECHELLE (100) AVEC UN CURSEUR

// console.log("id: ", parcel.id)
	return (
		<div className="flex m-5">
            <div 
            className={`bg-amber-200 flex flex-col justify-around`} 
            style={{height : parcelX*100, width : parcelY*100}}
             >

	{
        data.lines.map((line) => (
            line.parcelId === parcelID ? (                
                <Line 
                key={line.id}
                line={line}
                lineX={line.length}
                lineStatus={line.status}
                handleClick={handleClick}/>                       
            ) : null
        
        ))
        

            }
{/* <p>id : {parcel.id} length : {parcel.length} width : {parcel.width}</p> */}


            </div>
		</div>
	);
};

export default Bed;