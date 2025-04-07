export const getLogByGardenId = async (gardenId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLI_API}/log/garden/${gardenId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get garden log data: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in getLogByGardenId: ', error);
    throw error;
  }
};
