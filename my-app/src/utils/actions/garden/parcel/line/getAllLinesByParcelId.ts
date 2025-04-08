type parcelType = {
  parcel_id: number;
};

export const getAllLinesByParcelId = async (parcelId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/garden/parcel/line/${parcelId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get lines:  ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getAllLinesByParcelId: ', error);
    throw error;
  }
};
