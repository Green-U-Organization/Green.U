type FollowerType = {
    gardenId: number,
    followerId: number
}

export const addFollowerToGarden = async (follower: FollowerType): Promise<FollowerType> => {
    
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/follower/garden", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follower)
        });

        if (!response.ok) {
            throw new Error(`Failed to add garden follower: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error in addFollowerToGarden: ", error);
        throw error;
    }

};