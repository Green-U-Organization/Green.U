import React, { useRef, useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import Button from './Button';

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { translations } = useLanguage();
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileChange(event.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />

      <div className="group relative">
<<<<<<< HEAD
        <Button type="button" onClick={handleButtonClick}>
=======
        <Button onClick={handleButtonClick}>
>>>>>>> f4127f1daf37b7f02d7b6b13c6a06d379d1a5e1e
          {translations.chooseanimage}
        </Button>

        <div className="border-shadow bg-bginput text-m absolute bottom-full hidden rounded-xl border-2 p-2 text-black group-hover:block">
          {translations.authorizedformats} :<br />- 50Ko
          <br />- *.png, *.jpg, *.jpeg
          <br />- 96x96px
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
