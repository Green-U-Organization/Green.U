type UserType = {
  username?: string;
  password?: string;
  isAdmin?: boolean;
  firstname?: string;
  lastname?: string;
  email?: string;
  postalCode?: string;
  gender?: string;
  birthday?: string;
  bio?: string;
  profileImage?: string;
  level?: number;
  xp?: number;
  country?: string;
};

export const editUser = async (
  user: UserType,
  userId: number
): Promise<UserType> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/user/${userId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};
