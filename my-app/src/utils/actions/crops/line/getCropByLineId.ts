export const getCropByLinelId = async (lineId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/crops/line/${lineId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      // throw new Error(`Failed to get crops:  ${response.statusText}`);
      return JSON.stringify(response);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getCropByLineId: ', error);
    throw error;
  }
};
