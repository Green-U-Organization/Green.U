export const deleteUserById = async (userId: number, gardenId: number, tag: string) => {
    
    const bodyRequest = {
        user_id: userId,
        garden_id: gardenId,
        tag: tag
    };

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/tags", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyRequest)
        });

        if (!response.ok) {
            throw new Error(`Error deleting tag: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error deleting tag: ", error);
        throw error;
    }
};
