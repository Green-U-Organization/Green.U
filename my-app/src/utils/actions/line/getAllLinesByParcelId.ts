
export const getAllLinesByParcelId = async (parcelId : number) => {
    
    const bodyRequest = {
        parcel_id : parcelId
    }
    const allLinesByParcelId =
    fetch (process.env.NEXT_PUBLIC_API + "/garden/parcel/line", {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(bodyRequest)
    })

    return allLinesByParcelId
}