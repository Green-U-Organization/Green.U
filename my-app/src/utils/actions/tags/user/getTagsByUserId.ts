export const getTagsByUserId = async (userId: number) => {
    
    try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/tags/user/${userId}`, {
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
        console.error("Error in getTagByUserId: ", error);
        throw error;
    }
};

