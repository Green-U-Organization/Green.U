import { CropType } from '@/utils/types';

export const addCropLine = async (crop: CropType): Promise<CropType> => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API + '/crops', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(crop),
    });

    if (!response.ok) {
      throw new Error(`Failed to add crop line : ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in addCropLine: ', error);
    throw error;
  }
};
