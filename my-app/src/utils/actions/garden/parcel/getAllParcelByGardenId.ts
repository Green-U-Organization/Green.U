export const getAllParcelByGardenId = async (gardenId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/garden/parcel/${gardenId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to edit parcel:  ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in editParcel: ', error);
    throw error;
  }
};
