
export const getAllGardenByUserId = async (userId : number) => {

    const bodyRequest = {
        user_id : userId
    }
    const allGardenByUserId =
    fetch (process.env.NEXT_PUBLIC_API + "/garden/user", {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(bodyRequest)
    })

    return allGardenByUserId
}