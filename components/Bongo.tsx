import React from 'react';
import { Howl, Howler } from 'howler';

import config from '../config/bongo.json';

export default function Bongo(props) {
  const {
    setIsPlayingBongoL,
    setIsPlayingBongoR
  } = props;

  const [keysDown, setKeysDown] = React.useState([]);
  const keysDownRef = React.useRef(keysDown);
  
  React.useEffect(() => {
    let activeKeys = Object.keys(keysDown).filter(key => keysDown[key]);

    setIsPlayingBongoR(activeKeys.includes(config.notes[0].key));
    setIsPlayingBongoL(activeKeys.includes(config.notes[1].key));
  }, [keysDown]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, []);

  function handleKeyDown(e) {
    let key = e.key.toLowerCase();
    if (keysDownRef.current[key]) return;

    let note = Object.keys(config.notes).find(note => config.notes[note].key === key);
    if (!note) return;

    setKeysDown(prev => {
      keysDownRef.current[key] = true;
      return { ...prev, [key]: true };
    });

    playNote(note);
  }

  function handleKeyUp(e) {
    let key = e.key.toLowerCase()

    let note = Object.keys(config.notes).find(note => config.notes[note].key === key);
    if (!note) return;

    setKeysDown(prev => {
      keysDownRef.current[key] = false;
      return { ...prev, [key]: false };
    });
  }

  function playNote(note) {
    sounds[note].on("play", (id) => {
      if (config.notes[note].offset > 0)
        sounds[note].seek(config.notes[note].offset, id);
      sounds[note].volume(1, id);
    });
    sounds[note].play();
  }

  return (
    <div className="container max-w-xl flex h-12 px-12 gap-2">
      {['z','x','c','v','b','n','m',',','.'].map(key =>
      Object.keys(config.notes).find(note => config.notes[note].key === key) ?
        <div
          className={`flex-1 flex flex-col relative overflow-hidden justify-center items-center outline outline-yellow-400 ${!keysDown[key] ? 'outline-2' : 'outline-4'} rounded-xl select-none`}
          onMouseDown={e => {
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': key }));
          }}
          onMouseUp={e => {
            if (!keysDown[key]) return;
            document.dispatchEvent(new KeyboardEvent('keyup', { 'key': key }));
          }}
          onMouseLeave={e => {
            if (!keysDown[key]) return;
            document.dispatchEvent(new KeyboardEvent('keyup', { 'key': key }));
          }}
          key={key}
        >
          <img
            src="/assets/images/bongo_icon.png"
            className="absolute top-1/2 left-0 opacity-60"
          />
          
          <p className="text-xs text-white -mb-1 z-10">{Object.keys(config.notes).find(note => config.notes[note].key === key)}</p>
          <p className="text-xl font-bold text-white z-10">{key.toUpperCase()}</p>
        </div>
      :
        <div className="flex-1" key={key}></div>
      )}
    </div>
  );
}

const sounds = Object.keys(config.notes).reduce((a, v) => ({ ...a, [v]:
  new Howl({
    src: [`/assets/bongo/Bongo.${v}.mp3`, `/assets/bongo/Bongo.${v}.wav`],
    preload: true,
    onfade: (id) => sounds[v].stop(id),
  })
}), {});
