type TagType = {
    tag: string;
}

export const addGardenTag = async (tag: TagType, gardenId: number): Promise<TagType> => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/tags/garden/${gardenId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        });

        if (!response.ok) {
            throw new Error(`Failed to add garden tag: ${response.statusText}`);
        }

        return response.json();
    
    } catch (error) {
        console.error("Error in addGardenTag: ", error);
        throw error;
    }

};