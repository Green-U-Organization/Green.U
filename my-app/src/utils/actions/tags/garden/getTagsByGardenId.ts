export const getTagsByGardenId = async (gardenId: number) => {
    
    try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/tags/garden/${gardenId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to get tag data: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error in getTagByGardenId: ", error);
        throw error;
    }
};

