export const deleteOneParcelByParcelId = async (parcelId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/garden/parcel/${parcelId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete parcel: ${response.statusText}`);
    }

    return;
    //response.json();
  } catch (error) {
    console.error('Error in deleteOneParcelByParcelId: ', error);
    throw error;
  }
};
