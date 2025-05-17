'use client';
import React, { useRef, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

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
    <div className="fixed top-3 left-3 z-1">
      <audio ref={audioRef} loop>
        <source src="/music/bgMusic.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="rounded-full bg-black p-2 text-white shadow-lg transition"
      >
        {playing ? <FaVolumeUp size={20} /> : <FaVolumeMute size={20} />}
      </button>
    </div>
  );
}
