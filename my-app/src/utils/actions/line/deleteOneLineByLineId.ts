
export const deleteOneParcelByGardenId = async (parcelId : number) => {
    
    const bodyRequest = {
        parcel_id : parcelId
    }
    const oneLineByParcelId =
    fetch (process.env.NEXT_PUBLIC_API + "/garden/parcel/line", {
        method : "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(bodyRequest)
    })

    return oneLineByParcelId
}