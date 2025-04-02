type TagType = {
    user_id?: number,
    garden_id?: number
}

export const getTag = async (tag: TagType): Promise<TagType> => {
    
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/tags", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        });

        if (!response.ok) {
            throw new Error(`Failed to get tag data: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error in getTag: ", error);
        throw error;
    }
};

