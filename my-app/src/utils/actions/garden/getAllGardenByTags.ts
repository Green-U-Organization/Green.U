type tagsType = {
    tag_list: string
}

export const getAllGardenByTags = async (tags : tagsType) => {

    try {
        const response =
            await fetch(process.env.NEXT_PUBLIC_API + "/garden/tags", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tags)
            })

        if (!response.ok) {
            throw new Error(`Failed to get gardens:  ${response.statusText}`);
        }
        return response.json();

    } catch (error) {
        console.error("Error in getAllGardenByTags: ", error);
        throw error;
    }
}