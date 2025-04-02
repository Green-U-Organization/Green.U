type parcelType = {
    parcel_id : number
}

export const deleteOneParcelByParcelId = async (parcel : parcelType) => {
    
    try {
        const response =
    await fetch (process.env.NEXT_PUBLIC_API + "/garden/parcel", {
        method : "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify(parcel)
    })

    if (!response.ok) {
        throw new Error(`Failed to delete parcel: ${response.statusText}`);
    }

    return response.json();

} catch (error) {
    console.error("Error in deleteOneParcelByParcelId: ", error);
    throw error;
}
};