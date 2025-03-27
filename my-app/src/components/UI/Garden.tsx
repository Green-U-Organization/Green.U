import React from "react";
import data from "../../app/data/data";
import Parcel from "./Parcel";

type Props = {
	gardenId: number;
};


const Garden: React.FC<Props> = ({ gardenId }) => {
	return (
		<div>
			{data.parcels.map((parcel: { id: React.Key | null | undefined; width: number; length: number; gardenId: number }) => (
				parcel.gardenId === gardenId ? (
					<div key={parcel.id}>
						<Parcel
							parcel={parcel} 
							parcelX={parcel.width}
							parcelY={parcel.length}		
                            parcelID={parcel.id}				
						/>
					</div>
				) : null
			))}
		</div>
	);
};

export default Garden;