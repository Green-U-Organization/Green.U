export const getOneGardenByGardenId = async (gardenId : number) => {

    try {
        const response =
            await fetch(`${process.env.NEXT_PUBLIC_API}/${gardenId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
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