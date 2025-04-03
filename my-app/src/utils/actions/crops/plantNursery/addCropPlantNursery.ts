type CropType = {
    plantNurseryId: number,
    vegetable: string,
    variety: string,
    icon: string,
};

export const addCropPlantNursery = async (crop: CropType): Promise<CropType> => {

    try {
        const response =
            await fetch(process.env.NEXT_PUBLIC_API + "/crops/plantNursery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(crop)
            });

        if (!response.ok) {
            throw new Error(`Failed to add crop plant nursery :  ${response.statusText}`);
        }
        return response.json();

    } catch (error) {
        console.error("Error in createNewCrop: ", error);
        throw error;
    }
}