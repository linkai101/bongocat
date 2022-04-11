import React from 'react';
import { Howl, Howler } from 'howler';

import config from '../config/piano.json';

export default function Piano(props) {
  const {
    setIsPlayingPianoL,
    setIsPlayingPianoR
  } = props;

  const [lastNote, setLastNote] = React.useState({});
  const lastNoteRef = React.useRef(lastNote);
  const [keysDown, setKeysDown] = React.useState([]);
  const keysDownRef = React.useRef(keysDown);

  React.useEffect(() => {
    let activeKeys = Object.keys(keysDown).filter(key => keysDown[key]);

    let leftKeys = [
      ...config.blackKeys.slice(0, Math.ceil(config.blackKeys.length/2)),
      ...config.whiteKeys.slice(0, Math.ceil(config.whiteKeys.length/2))
    ];
    let rightKeys = [
      ...config.blackKeys.slice(-Math.floor(config.blackKeys.length/2)),
      ...config.whiteKeys.slice(-Math.floor(config.whiteKeys.length/2))
    ]; // floor so middle keys won't trigger both

    setIsPlayingPianoR(activeKeys.some(key => leftKeys.includes(key)));
    setIsPlayingPianoL(activeKeys.some(key => rightKeys.includes(key)));
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
    let key = e.key.toLowerCase(); // idea: remove toLowerCase() so caps lock -> sustain

    let note = Object.keys(config.notes).find(note => config.notes[note].key === key);
    if (!note) return;

    setKeysDown(prev => {
      keysDownRef.current[key] = false;
      return { ...prev, [key]: false };
    });

    sounds[note].fade(1, 0, config.fadeDuration, lastNoteRef.current[note]);
  }

  function playNote(note) {
    sounds[note].on("play", (id) => {
      setLastNote(prev => {
        lastNoteRef.current[note] = id;
        return { ...prev, [note]: id };
      })

      if (config.notes[note].offset > 0)
        sounds[note].seek(config.notes[note].offset, id);
      sounds[note].volume(1, id);
    });
    sounds[note].play();
  }

  return (
    <div className="flex flex-col px-4 sm:px-9">
      <div className="flex px-5 sm:px-7 h-18 sm:h-20 gap-1 sm:gap-2 z-20">
        {config.blackKeys.map(key =>
          Object.keys(config.notes).find(note => config.notes[note].key === key) ?
          <div
            className={`flex-1 flex flex-col-reverse px-1 py-2 ${!keysDown[key] ? 'bg-stone-800' : 'bg-stone-700'} border-2 sm:border-4 border-stone-200 rounded-lg sm:rounded-xl select-none overflow-hidden`}
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
            <p className="text-lg sm:text-xl font-bold text-white text-center">{key.toUpperCase()}</p>
            <p className="text-xs text-white text-center">{Object.keys(config.notes).find(note => config.notes[note].key === key)}</p>
          </div>
          :
          <div className="flex-1 mx-2" key={key}></div>
        )}
      </div>

      <div className="-mt-12 sm:-mt-16 flex h-24 sm:h-32 gap-1 sm:gap-2 z-10">
        {config.whiteKeys.map(key =>
          <div
            className={`flex-1 flex flex-col-reverse px-1 py-2 ${!keysDown[key] ? 'bg-stone-200' : 'bg-stone-400'} rounded-lg sm:rounded-xl select-none overflow-hidden`}
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
            <p className="text-lg sm:text-xl font-bold text-center py-0">{key.toUpperCase()}</p>
            <p className="text-xs text-center">{Object.keys(config.notes).find(note => config.notes[note].key === key)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const sounds = Object.keys(config.notes).reduce((a, v) => ({ ...a, [v]:
  new Howl({
    src: [`/assets/piano/Piano.ff.${v}.mp3`],
    preload: true,
    onfade: (id) => sounds[v].stop(id),
  })
}), {});
