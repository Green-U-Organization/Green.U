type gardenType = {
    garden_id: number
}

export const getAllParcelByGardenId = async (garden : gardenType) => {

    try {
        const response =
            await fetch(process.env.NEXT_PUBLIC_API + "/garden/parcel", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(garden)
            })

        if (!response.ok) {
            throw new Error(`Failed to edit parcel:  ${response.statusText}`);
        }
        return response.json();

    } catch (error) {
        console.error("Error in editParcel: ", error)
        throw error
    }
};