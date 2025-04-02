type gardenType = {
    garden_id: number
}

export const getOneGardenByGardenId = async (garden : gardenType) => {

    try {
        const response =
            await fetch(process.env.NEXT_PUBLIC_API + "/garden", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(garden)
            })

        if (!response.ok) {
            throw new Error(`Failed to get garden:  ${response.statusText}`);
        }
        return response.json();

    } catch (error) {
        console.error("Error in getOneGardenByGardenId: ", error);
        throw error;
    }
}