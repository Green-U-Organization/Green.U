import PublicProfile from '@/components/Page/PublicProfile';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string; // Les paramètres d'URL sont toujours des strings
  };
}

const PublicProfilePage = ({ params }: Props) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound(); // Gère le cas où l'ID n'est pas un nombre
  }

  return <PublicProfile id={id} />;
};

export default PublicProfilePage;
