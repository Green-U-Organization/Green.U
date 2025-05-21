'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Cookies from 'js-cookie';
import { useLanguage } from '@/app/contexts/LanguageProvider';
import { useDispatch } from 'react-redux';
import { logout } from '../../slice/authSlice';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useLanguage();
  const { translations } = useLanguage();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log('logout successful');
    setIsOpen(false);
  };

  return (
    <>
      {/* Choix de langue */}
      <div className="flex flex-col gap-4">
        {/* Anglais */}
        <button
          onClick={() => setLocale('en')}
          className={`relative h-[4vh] w-[6vh] ${locale === 'en' ? 'cursor-default' : 'cursor-pointer'}`}
          disabled={locale === 'en'} // Désactive le bouton si l'anglais est sélectionné
        >
          <Image
            src={
              locale === 'en'
                ? '/image/divers/flag-en-hover.png'
                : '/image/divers/flag-en.png'
            }
            alt="flag-en"
            width={50}
            height={50}
            className="block h-[4vh] w-[6vh] transition-all duration-300 hover:opacity-0"
          />
          <Image
            src="/image/divers/flag-en-hover.png"
            alt="flag-en-hover"
            width={50}
            height={50}
            className="absolute top-0 left-0 h-[4vh] w-[6vh] opacity-0 transition-opacity duration-300 hover:opacity-100"
          />
        </button>

        {/* Français */}
        <button
          onClick={() => setLocale('fr')}
          className={`relative h-[4vh] w-[6vh] ${locale === 'fr' ? 'cursor-default' : 'cursor-pointer'}`}
          disabled={locale === 'fr'} // Désactive le bouton si le français est sélectionné
        >
          <Image
            src={
              locale === 'fr'
                ? '/image/divers/flag-fr-hover.png'
                : '/image/divers/flag-fr.png'
            }
            alt="flag-fr"
            width={50}
            height={50}
            className="block h-[4vh] w-[6vh] transition-all duration-300 hover:opacity-0"
          />
          <Image
            src="/image/divers/flag-fr-hover.png"
            alt="flag-fr-hover"
            width={50}
            height={50}
            className="absolute top-0 left-0 h-[4vh] w-[6vh] opacity-0 transition-opacity duration-300 hover:opacity-100"
          />
        </button>
      </div>
    </>
  );
};

export default Navbar;
