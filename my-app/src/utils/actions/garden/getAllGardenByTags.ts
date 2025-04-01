
export const getAllGardenByTags = async (tags: Array<string>) => {

const tagList = tags.join()

    const bodyRequest = {
        tag_list : tagList
    }
    const allGardenByTags =
    fetch (process.env.NEXT_PUBLIC_API + "/garden/tags", {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(bodyRequest)
    })

    return allGardenByTags
}