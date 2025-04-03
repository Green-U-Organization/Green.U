export const getFollowerByGardenId = async (gardenId: number) => {
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLI_API}/follower/garden/${gardenId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to get garden follower data: ${response.statusText}`);
        }

        return response.json();
      
    } catch (error) {
        console.error("Error in getFollowerByGardenId: ", error);
        throw error;
    }
};
