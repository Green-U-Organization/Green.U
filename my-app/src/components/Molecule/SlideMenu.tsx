'use client';
import React, { useState, useRef, useEffect } from 'react';
import BugReport from '../Atom/BugReport';
import Music from '@/components/Atom/Music';
import Languages from '../UI/Languages';
import { useSwipeable } from 'react-swipeable';

const SlideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  //Ferme le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handlers swipe uniquement sur le bouton
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => setIsOpen(true),
    onSwipedLeft: () => setIsOpen(false),
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <div className="relative z-51 touch-pan-y overscroll-contain">
      {/* Bouton d'ouverture avec swipe */}
      <button
        {...swipeHandlers}
        onClick={() => setIsOpen(true)}
        className="bg-bgbutton hover:bg-bginput fixed top-15 h-30 w-3 cursor-pointer rounded-full border-1"
      ></button>

      {/* Menu coulissant */}
      <div
        ref={menuRef}
        className={`bg-bgbutton fixed top-15 left-0 z-1000 flex w-fit transform flex-col content-center justify-center gap-2 rounded-r-xl border-1 p-2 shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Languages />
        <Music />
        <BugReport />
      </div>
    </div>
  );
};

export default SlideMenu;
