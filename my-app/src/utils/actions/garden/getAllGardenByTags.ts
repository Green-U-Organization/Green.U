export const getAllGardenByTags = async (tags : string) => {

    try {
        const response =
            await fetch(`${process.env.NEXT_PUBLIC_API}/garden/tags/${tags}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })

        if (!response.ok) {
            throw new Error(`Failed to get gardens:  ${response.statusText}`);
        }
        return response.json();

    } catch (error) {
        console.error("Error in getAllGardenByTags: ", error);
        throw error;
    }
}