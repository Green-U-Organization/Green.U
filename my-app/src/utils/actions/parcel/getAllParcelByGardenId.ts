
export const getAllParcelByGardenId = async (gardenId : number) => {
    
        const bodyRequest = {
            garden_id : gardenId
        }
        const allParcelByGardenId =
        fetch (process.env.NEXT_PUBLIC_API + "/garden/parcel", {
            method : "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify(bodyRequest)
        })
    
        return allParcelByGardenId
    }