'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/app/contexts/LanguageProvider';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {locale, setLocale} = useLanguage();
  const {translations} = useLanguage();
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 shadow-md z-100">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold hover:text-gray-600">
          Green-U
        </Link>

        {/* Choix de langue */}
        <div className="flex gap-5">
          {/* Anglais */}
          <button 
            onClick={() => setLocale('en')} 
            className={`relative w-10 h-8 ${locale === "en" ? "cursor-default" : "cursor-pointer"}`}
            disabled={locale === "en"} // Désactive le bouton si l'anglais est sélectionné
          >
            <Image 
              src={locale === "en" ? "/image/divers/flag-en-hover.png" : "/image/divers/flag-en.png"} 
              alt="flag-en" 
              width={40}
              height={32}
              className="w-10 h-8 block transition-all duration-300 hover:opacity-0"
            />
            <Image 
              src="/image/divers/flag-en-hover.png" 
              alt="flag-en-hover" 
              width={40}
              height={32}
              className="absolute top-0 left-0 w-10 h-8 opacity-0 transition-opacity duration-300 hover:opacity-100"
            />
          </button>

          {/* Français */}
          <button 
            onClick={() => setLocale('fr')} 
            className={`relative w-10 h-8 ${locale === "fr" ? "cursor-default" : "cursor-pointer"}`}
            disabled={locale === "fr"} // Désactive le bouton si le français est sélectionné
          >
            <Image 
              src={locale === "fr" ? "/image/divers/flag-fr-hover.png" : "/image/divers/flag-fr.png"} 
              alt="flag-fr" 
              width={40}
              height={32}
              className="w-10 h-8 block transition-all duration-300 hover:opacity-0"
            />
            <Image 
              src="/image/divers/flag-fr-hover.png" 
              alt="flag-fr-hover"
              width={40}
              height={32} 
              className="absolute top-0 left-0 w-10 h-8 opacity-0 transition-opacity duration-300 hover:opacity-100"
            />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/login" className="hover:text-gray-600">{translations.login}</Link>
          <Link href="/signin" className="hover:text-gray-600">{translations.signup}</Link>
          <Link href="/landing" className="hover:text-gray-600">{translations.landing}</Link>
          <Link href="/map" className="hover:text-gray-600">{translations.map}</Link>
          <Link href="/profile" className="hover:text-gray-600">{translations.profile}</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <Link href="/login" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>{translations.login}</Link>
          <Link href="/signin" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>{translations.signup}</Link>
          <Link href="/landing" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>{translations.landing}</Link>
          <Link href="/map" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>{translations.map}</Link>
          <Link href="/profile" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>{translations.profile}</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
