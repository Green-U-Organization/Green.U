export const deleteOneParcelByParcelId = async (gardenId: number) => {
    
    try {
        const response =
    await fetch (`${process.env.NEXT_PUBLIC_API}/garden/tags/${gardenId}`, {
        method : "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
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