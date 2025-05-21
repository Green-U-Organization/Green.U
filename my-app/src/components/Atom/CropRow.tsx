/* eslint-disable @next/next/no-img-element */

import { useGetCropByNurseryIdQuery } from '@/slice/fetch';
import { CropType } from '@/utils/types';
import { FC } from 'react';

const CropRow: FC<{
  nurseryId: number;
  onSelect: (crop: CropType) => void;
  selectedCrop?: CropType;
}> = ({ nurseryId, onSelect, selectedCrop }) => {
  const { data: cropData } = useGetCropByNurseryIdQuery({ nurseryId });

  return (
    <>
      {cropData?.content.map((crop) => (
        <tr
          key={crop.id}
          onClick={() => onSelect(crop)}
          className={`${selectedCrop?.id === crop.id ? 'bg-[#f6d4ba]' : ''}`}
        >
          <td className="border-1 p-1">
            <img src={crop.icon} alt="" className="mx-auto" />
          </td>
          <td className="border-1 p-1">{crop.vegetable}</td>
          <td className="border-1 p-1">{crop.variety}</td>
          <td className="border-1 p-1">{crop.nPot}</td>
          <td className="border-1 p-1">
            {crop.potSize}x{crop.potSize}
          </td>
          <td className="border-1 p-1">
            <img
              className="mx-auto"
              src="/image/icons/info.png"
              alt="Display info about line"
              style={{ width: '5vw', height: '5vw' }}
            />
          </td>
          <td className="border-1 p-1">
            <img
              className="mx-auto"
              src="/image/icons/trash.png"
              alt="Delete line"
              style={{ width: '5vw', height: '5vw' }}
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default CropRow;
