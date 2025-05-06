export const deleteUser = async (userId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/user/${userId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in deleteUserById: ', error);
    throw error;
  }
};
