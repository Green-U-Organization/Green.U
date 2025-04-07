type FollowerType = {
  userId: number;
  followerId: number;
};

export const deleteFollowerOfUser = async (
  follower: FollowerType
): Promise<FollowerType> => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API + '/follower/user',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(follower),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete user follower: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in deleteFollowerOfUser: ', error);
    throw error;
  }
};
