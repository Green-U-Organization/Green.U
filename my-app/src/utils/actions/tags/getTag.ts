export const getUserById = async (userId: number, gardenId: number) => {
    
    const bodyRequest = {
        user_id: userId,
        garden_id: gardenId
    };
    
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/tags", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyRequest)
        });

        if (!response.ok) {
            throw new Error(`Failed to get tag data: ${response.statusText}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error in getUserTags:", error);
        throw error;
    }
};

