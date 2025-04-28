type cropType = {
  plantNurseryId?: number;
  icon?: string;
};

export const createNewCrop = async (crop: cropType): Promise<cropType> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API + '/crops/plantNursery',
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(crop),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to edit crop:  ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in editCrop: ', error);
    throw error;
  }
};
