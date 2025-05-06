export const getFollowerByUserId = async (userId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLI_API}/follower/user/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to get user follower data: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('Error in getFollowerByUserId: ', error);
    throw error;
  }
};
