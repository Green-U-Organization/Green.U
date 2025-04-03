type FollowerType = {
    userId: number,
    followerId: number
}

export const addFollowerToUser = async (follower: FollowerType): Promise<FollowerType> => {
    
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/follower/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follower)
        });

        if (!response.ok) {
            throw new Error(`Failed to add user follower: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error in addFollowerToUser: ", error);
        throw error;
    }

};