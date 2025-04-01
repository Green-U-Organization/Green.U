
export const deleteOneParcelByGardenId = async (gardenId : number) => {
    
    const bodyRequest = {
        garden_id : gardenId
    }
    const oneParcelByGardenId =
    fetch (process.env.NEXT_PUBLIC_API + "/garden/parcel", {
        method : "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(bodyRequest)
    })

    return oneParcelByGardenId
}