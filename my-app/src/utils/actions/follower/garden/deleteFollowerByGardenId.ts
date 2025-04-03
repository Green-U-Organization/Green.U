type FollowerType = {
    garden_id: number,
    follower_id: number
}

export const deleteFollowerByGardenId = async (follower: FollowerType): Promise<FollowerType> => {

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/follower/garden", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(follower)
        });

        if (!response.ok) {
            throw new Error(`Failed to delete garden follower: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error in deleteFollowerByGardenId: ", error);
        throw error;
    }
};