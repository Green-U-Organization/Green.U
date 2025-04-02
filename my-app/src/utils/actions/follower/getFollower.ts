type FollowerType = {
    user_id?: number,
    garden_id?: number
}

export const getFollower = async (follower: FollowerType): Promise<FollowerType> => {
    
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/follower", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follower)
        });

        if (!response.ok) {
            throw new Error(`Failed to get follower data: ${response.statusText}`);
        }

        return response.json();
      
    } catch (error) {
        console.error("Error in getFollower: ", error);
        throw error;
    }
};
