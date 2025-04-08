export const getUserById = async <T extends Record<string, unknown>>(
  userId: number
): Promise<T> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/user/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to get user data: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in getUserById: ', error);
    throw error;
  }
};
