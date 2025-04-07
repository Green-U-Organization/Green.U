type FollowerType = {
  gardenId: number;
  followerId: number;
};

export const deleteFollowerOfGarden = async (
  follower: FollowerType
): Promise<FollowerType> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API + '/follower/garden',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(follower),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete garden follower: ${response.statusText}`
      );
    }

    return response.json();
  } catch (error) {
    console.error('Error in deleteFollowerOfGarden: ', error);
    throw error;
  }
};
