import React, { FC } from 'react';
import Card from '../Atom/Card';
import H2 from '../Atom/H2';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';
import { addCropLine } from '@/utils/actions/crops/line/addCropLine';

interface AddCropPopup {
  handleYesClick?: () => void;
  handleNoClick: () => void;
  lineId: number;
}

const AddCropPopup: FC<AddCropPopup> = ({
  handleYesClick,
  lineId,
  handleNoClick,
}) => {
  const handleSubmit = async () => {
    const form = document.getElementById('addCrop') as HTMLFormElement;
    if (form) {
      const formData = new FormData(form);

      const formatDate = (date: Date | null) => {
        return date ? date.toISOString().split('T')[0] : null; // Formate la date en "YYYY-MM-DD"
      };

      const sowing =
        formData.get('cropAction') === 'sowing' ? formatDate(new Date()) : '';
      const planting =
        formData.get('cropAction') === 'planting' ? formatDate(new Date()) : '';

      const cropData = {
        lineId: lineId,
        vegetable: (formData.get('vegetable') as string) || '',
        variety: (formData.get('variety') as string) || '',
        sowing: sowing || '',
        planting: planting || '',
        harvesting: '',
      };

      console.log(cropData);

      await addCropLine(cropData);
    }
  };

  return (
    <Card className="flex w-[70vw] flex-col justify-center">
      <H2>Wich crop you want to add?</H2>
      <form method="post" id="addCrop">
        <TextInput
          type="text"
          name="vegetable"
          className="mx-[4vw]"
          label="Vegetable"
        />
        <TextInput
          type="text"
          name="variety"
          className="mx-[4vw] -mt-[3vh]"
          label="Variety"
        />
        <select className="mx-[4vw]" name="cropAction" id="cropAction">
          <option value="sowing">Sowing</option>
          <option value="planting">Planting</option>
        </select>
        <br />

        <div className="flex items-center justify-center">
          <Button onClick={handleNoClick}>Back</Button>
          <Button onClick={handleSubmit}>Plant</Button>
        </div>
      </form>
    </Card>
  );
};

export default AddCropPopup;
