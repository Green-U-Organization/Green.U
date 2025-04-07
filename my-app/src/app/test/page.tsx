'use client';
import { useState } from 'react';
import { addUser } from '@/utils/actions/user/addUser';
import Button from '@/components/UI/Button';

export default function Page() {
  const [user] = useState({
    username: 'toto2',
    password: '11111111#',
    isAdmin: false,
    firstname: 'Coco',
    lastname: 'Bello',
    email: 'toto@gmail.com',
    postalCode: '4000-Liège',
    gender: 'M',
    birthday: '1983-04-12',
    country: 'BE',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await addUser(user);
      console.log('Utilisateur ajouté avec succès :', response);
      setSuccess('Utilisateur ajouté avec succès : ' + response);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
      setError(
        error instanceof Error ? error.message : 'Une erreur est survenue'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ml-10">
      <Button type="submit">Créer l'utilisateur</Button>
      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
