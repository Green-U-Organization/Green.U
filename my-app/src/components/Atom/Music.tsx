'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((err) => console.error('Audio error', err));
      }
      setPlaying(!playing);
    }
  };

  return (
    <div className="w-full">
      <audio ref={audioRef} loop>
        <source src="/music/bgMusic.mp3" type="audio/mpeg" />
      </audio>

      <Image
        width={50}
        height={50}
        src={
          playing
            ? '/image/icons/volume-high.svg'
            : '/image/icons/volume-mute.svg'
        }
        alt="Toggle music"
        className="h-[6vh] w-[6vh] cursor-pointer"
        onClick={toggleMusic}
      />
    </div>
  );
}
