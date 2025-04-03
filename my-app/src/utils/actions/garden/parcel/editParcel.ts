type parcelType = {
    parcelId: number,
    gardenId?: number,
    length?: number,
    width?: number,
    x_position?: number,
    y_position?: number,
    parcel_angle?: number
};

export const createNewGarden = async (
    parcel: parcelType
): Promise<parcelType> => {

    try {
        const response =
            await fetch(process.env.NEXT_PUBLIC_API + "/garden/parcel", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parcel)
            });

        if (!response.ok) {
            throw new Error(`Failed to edit parcel:  ${response.statusText}`);
        }
        return response.json();

    } catch (error) {
        console.error("Error in editParcel: ", error)
        throw error
    }
};