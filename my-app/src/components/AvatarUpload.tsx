import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import FileUpload from './UI/FileUpload';
import { useLanguage } from '../app/contexts/LanguageProvider';
import Button from "./UI/Button";

export default function AvatarUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  //const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const { translations } = useLanguage();

  //Vérification de plusieurs critères afin de valider le fichier sélectionné :
  // L'extension doit être : png, jpeg ou jpg
  // Le fichier ne doit pas faire plus de 50Ko
  // Les dimensions de l'image ne doivent pas dépasser 96 x 96px
  const handleFileChange = (selectedFile: File) => {
    const validFormats = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 50 * 1024; // 50 Ko
    const maxDimensions = 96; // 96 px
    setFileName(null);

    if (!validFormats.includes(selectedFile.type)) {
      setError(translations.formatnotallowed);
      setFile(null);
      return;
    }

    if (selectedFile.size > maxSize) {
      setError(translations.sizeexceed);
      setFile(null);
      return;
    }


    const img = new Image();
    img.src = URL.createObjectURL(selectedFile);
    img.onload = () => {
      if (img.width > maxDimensions || img.height > maxDimensions) {
        setError(`${translations.dimensionsexceed} ${maxDimensions}x${maxDimensions} pixels.`);
        setFile(null);
      } else {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setError(null);
      }
      URL.revokeObjectURL(img.src);
    };
  };

  const uploadImage = async () => {
    if (!file) return alert(translations.chooseanimage);

    setUploading(true);
    setError(null);

    const fileName = `avatars/${Date.now()}_${file.name}`;
    setFileName(null);
    const { data, error } = await supabase.storage.from("avatars").upload(fileName, file);


    if (error) {
      console.error(translations.uploaderror, error.message);
      setError(`${translations.uploaderror} ${error.message}`);
      setUploading(false);
      return;
    }

    // Récupération du nom du fichier téléversé
    // if (data && data.path) {
    //   setUploadedFileName(data.path);
    // }

    // Récupération de l'url publique du fichier téléversé
    const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
    setAvatarUrl(publicUrlData.publicUrl);
  
    setUploading(false);
  };

  return (
    <div className="mt-2 border-1 border-shadow">
      <h2 className="text-center text-3xl font-semibold bg-cardbackground py-2">
        {translations.uploadyouravatar}
      </h2>

      {avatarUrl ? (
        <div className="flex flex-col items-center mb-2">
          <img src={avatarUrl} alt="Avatar" className="w-24 h-24 mx-auto rounded-full border-2 border-border" />
          <p className="mt-2 text-shadow">{translations.avataruploaded}</p>
        </div>
      ) : (
        <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full border-2 border-border mb-2"></div>
      )}

      {/* Pour visualiser le nom de fichier de l'image sélectionnée
      Et l'url de l'image téléversée */}
      {fileName && (
        <>
        <p className="text-gray-600 text-center mt-2">{translations.selectedfile} {fileName}</p>
        {/* <p className="text-gray-600 text-center mt-2">{uploadedFileName}</p> */}
        </>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex justify-center">
        <FileUpload onFileChange={handleFileChange} />

        {file &&
          <Button
            type="button"
            onClick={uploadImage}
            disabled={uploading}
          >
            {uploading ? translations.uploading : translations.upload}
          </Button>
        }
      </div>

    </div>
  );
}
