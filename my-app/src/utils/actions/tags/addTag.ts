type TagData = {
    user_id: number;
    garden_id: number;
    tag: string;
}

export const createTag = async (tag: TagData): Promise<TagData> => {

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/tags", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        });

        if (!response.ok) {
            throw new Error(`Failed to add tag: ${response.statusText}`);
        }

        return await response.json();
    
    } catch (error) {
        console.error("Error in addTag: ", error);
        throw error;
    }

};