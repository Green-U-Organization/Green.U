'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold hover:text-gray-600">
          Green-U
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/login" className="hover:text-gray-600">Login</Link>
          <Link href="/signin" className="hover:text-gray-600">Sign in</Link>
          <Link href="/landing" className="hover:text-gray-600">Landing</Link>
          <Link href="/profile" className="hover:text-gray-600">Profile</Link>
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
          <Link href="/login" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Login</Link>
          <Link href="/signin" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Sign in</Link>
          <Link href="/landing" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Landing</Link>
          <Link href="/profile" className="hover:text-gray-600" onClick={() => setIsOpen(false)}>Profile</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
