type gardenType = {
    author_id: number,
    name: string,
    description: string,
    latitude: number,
    longitude: number,
    length: number,
    width: number,
    privacy: "private" | "public"
    type: "individual" | "collective" | "professionnal",
};

export const createNewGarden = async (
    garden: gardenType
): Promise<gardenType> => {

    try {
        const response =
            await fetch(process.env.NEXT_PUBLIC_API + "/garden", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(garden)
            });

        if (!response.ok) {
            throw new Error(`Failed to create a new garden:  ${response.statusText}`);
        }
        return response.json();

    } catch (error) {
        console.error("Error in createNewGarden: ", error)
        throw error
    }
};