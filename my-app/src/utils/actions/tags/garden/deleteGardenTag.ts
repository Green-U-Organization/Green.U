type TagType = {
    tag: string
}

export const deleteGardenTag = async (tag : TagType, gardenId: number): Promise<TagType> => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/tags/garden/${gardenId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        });

        if (!response.ok) {
            throw new Error(`Error deleting tag: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error in deleteGardenTag: ", error);
        throw error;
    }
};
