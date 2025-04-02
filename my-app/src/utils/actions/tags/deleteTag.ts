type TagType = {
    user_id: number,
    garden_id?: number,
    tag: string
}

export const deleteTag = async (user : TagType): Promise<TagType> => {

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API + "/tags", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`Error deleting tag: ${response.statusText}`);
        }

        return response.json();

    } catch (error) {
        console.error("Error in deleteUser: ", error);
        throw error;
    }
};
