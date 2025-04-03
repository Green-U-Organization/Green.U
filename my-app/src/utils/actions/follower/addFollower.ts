type FollowerType = {
    user_id?: number,
    garden_id?: number,
    follower_id: number
}

export const addFollower = async (follower: FollowerType): Promise<FollowerType> => {
    
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/follower", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follower)
        });

        if (!response.ok) {
            throw new Error(`Failed to add follower: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error in addFollower: ", error);
        throw error;
    }

};