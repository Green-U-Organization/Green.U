'use client';

//Perplexity Power...

import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: { children: ReactNode }) => {
  const elRef = useRef<HTMLElement | null>(null);

  if (!elRef.current && typeof document !== 'undefined') {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const el = elRef.current!;
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return elRef.current ? createPortal(children, elRef.current) : null;
};
export default Portal;
