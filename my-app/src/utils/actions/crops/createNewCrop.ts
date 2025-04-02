type cropType = {
    line_id?: number,
    plant_nursery_id?: number,
    vegetable: string,
    variety: string,
    icon: string,
};

export const createNewCrop = async (
    crop: cropType
): Promise<cropType> => {

    try {
        const response =
            await fetch(process.env.NEXT_PUBLIC_API + "/crops", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(crop)
            });

        if (!response.ok) {
            throw new Error(`Failed to create new crop:  ${response.statusText}`);
        }
        return response.json();

    } catch (error) {
        console.error("Error in createNewCrop: ", error);
        throw error;
    }
}