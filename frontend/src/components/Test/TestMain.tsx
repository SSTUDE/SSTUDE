import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const TestMain = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const playSound = () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    };

    window.addEventListener('click', playSound);

    return () => {
      window.removeEventListener('click', playSound);
    };
  }, []);

  return (
    <div>
      <audio src="/assets/sounds/blop.mp3" ref={audioRef}></audio>
    </div>
  );
};

export default TestMain