type credentialType = {
  email: string;
  password: string;
};

export const login = async (
  credential: credentialType
): Promise<credentialType> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credential),
    });

    if (!response.ok) {
      throw new Error(`Failed to create login:  ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in login: ', error);
    throw error;
  }
};
