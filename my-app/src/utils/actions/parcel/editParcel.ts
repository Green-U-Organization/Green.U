
type parcelType = {
    parcelId: number,
    gardenId: number,
    parcelLength: number,
    parcelWidth: number,
    parcelXPosition: number,
    parcelYposition: number,
    parcelAngle : number    
};

export const createNewGarden = async (
    parcelId: number,
    gardenId: number,
    parcelLength: number,
    parcelWidth: number,
    parcelXPosition: number,
    parcelYposition: number,
    parcelAngle : number
): Promise<parcelType> => {

    const bodyRequest = {
        parcel_id: parcelId,
        garden_id: gardenId,
        length: parcelLength,
        width: parcelWidth,
        x_position: parcelXPosition,
        y_position: parcelYposition,
        parcel_angle: parcelAngle
    };

    const response = 
    await fetch(process.env.NEXT_PUBLIC_API + "/garden/parcel", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequest)
    });

    if (!response.ok) {
        throw new Error("Failed to edit the parcel");
    }

    const newParcel: parcelType = await response.json();
    return newParcel;
};