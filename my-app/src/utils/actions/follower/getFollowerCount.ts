type FollowerType = {
    user_id?: number,
    garden_id?: number
}

export const getFollowerCount = async (follower: FollowerType): Promise<FollowerType> => {
    
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/follower", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follower)
        });

        if (!response.ok) {
            throw new Error(`Failed to get follower count: ${response.statusText}`);
        }

        return response.json();
      
    } catch (error) {
        console.error("Error in getFollowerCount: ", error);
        throw error;
    }
};