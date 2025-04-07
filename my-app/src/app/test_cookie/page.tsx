'use client';
import { useState, useEffect } from 'react';
import { getUserById } from '@/utils/actions/user/getUserById';
import Cookies from 'js-cookie';
import Button from '@/components/UI/Button';

export default function Page() {
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 🔹 Récupérer l'ID utilisateur stocké dans les cookies au chargement du composant
  useEffect(() => {
    const id = Cookies.get('userId');
    setUserId(id || 'Aucun ID trouvé');
  }, []);

  // 🔹 Fonction pour récupérer l'utilisateur et stocker son ID dans le cookie
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await getUserById(1);
      console.log(response);
      if (!response) {
        throw new Error('Utilisateur non trouvé');
      }
      const userId = response.id;

      // 🔹 Stocker l'ID utilisateur dans un cookie sécurisé
      Cookies.set('userId', userId, {
        expires: 7,
        secure: true,
        sameSite: 'Strict',
      });

      // 🔹 Mettre à jour l'état pour afficher l'ID
      setUserId(userId);
      setSuccess(`Utilisateur récupéré avec succès : ID ${userId}`);
    } catch (error) {
      console.error("Erreur lors du chargement de l'utilisateur :", error);
      setError(
        error instanceof Error ? error.message : 'Une erreur est survenue'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ml-10">
      <Button type="submit">Charger l'utilisateur</Button>
      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <p>ID utilisateur : {userId}</p>
    </form>
  );
}
