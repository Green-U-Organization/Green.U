export const deleteOneLineByLineId = async (lineId: number) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API + `/garden/parcel/line/${lineId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete line:  ${response.statusText}`);
    }
    return;
    //response.json();
  } catch (error) {
    console.error('Error in deleteoneLineByLineId: ', error);
    throw error;
  }
};
