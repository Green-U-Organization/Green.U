
type parcelType = {
    gardenId: number,
    parcelLength: number,
    parcelWidth: number,
    parcelXPosition: number,
    parcelYposition: number,
    parcelAngle : number    
};

export const createNewGarden = async (
    gardenId: number,
    parcelLength: number,
    parcelWidth: number,
    parcelXPosition: number,
    parcelYposition: number,
    parcelAngle : number
): Promise<parcelType> => {

    const bodyRequest = {
        garden_id: gardenId,
        length: parcelLength,
        width: parcelWidth,
        x_position: parcelXPosition,
        y_position: parcelYposition,
        parcel_angle: parcelAngle
    };

    const response = 
    await fetch(process.env.NEXT_PUBLIC_API + "/garden/parcel", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyRequest)
    });

    if (!response.ok) {
        throw new Error("Failed to create a new parcel");
    }

    const newParcel: parcelType = await response.json();
    return newParcel;
};