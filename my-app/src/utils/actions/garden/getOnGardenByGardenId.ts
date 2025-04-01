
export const getOneGardenByGardenId = async (gardenId : number) => {

    const bodyRequest = {
        garden_id : gardenId
    }
    const oneGardenByGardenId =
    fetch (process.env.NEXT_PUBLIC_API + "/garden", {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(bodyRequest)
    })

    return oneGardenByGardenId
}