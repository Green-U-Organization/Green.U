export const getFollowerCountByGardenId = async (gardenId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLI_API}/follower/count/garden/${gardenId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to get count follower by garden: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('Error in getFollowerCountByGardenId: ', error);
    throw error;
  }
};
