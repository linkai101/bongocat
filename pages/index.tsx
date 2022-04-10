import React from 'react';
import Head from 'next/head';
//import { Howl, Howler } from 'howler';

import Piano from '../components/Piano';

export default function Home() {
  const [isPlayingPianoL, setIsPlayingPianoL] = React.useState(false);
  const [isPlayingPianoR, setIsPlayingPianoR] = React.useState(false);

  // TODO: use tab to switch instruments

  return <>
    <Head>
      <title>Bongo Cat</title>
      <meta name="description" content="by @linkai101 on github" />
    </Head>


    <div className="h-screen h-screen-safari overflow-auto bg-stone-900">
      <div className="container max-w-xl p-4">
        <div className="relative aspect-[3/2]">
          <hr
            className="absolute w-full origin-center rotate-12 bg-stone-50 border-2 border-stone-50 rounded-md"
            style={{ top: '39%' }}
          />
          <img src="/assets/images/keyboard.png" className="absolute top-0 left-0"/>
          <img src="/assets/images/cat.png" className="absolute top-0 left-0"/>
          <img src="/assets/images/mouth.png" className="absolute top-0 left-0"/>
          {isPlayingPianoL ?
            <img src="/assets/images/paw_left_down.png" className="absolute top-0 left-0"/>
          :
            <img src="/assets/images/paw_left_up.png" className="absolute top-0 left-0"/>
          }
          {isPlayingPianoR ?
            <img src="/assets/images/paw_right_down.png" className="absolute top-0 left-0"/>
          :
            <img src="/assets/images/paw_right_up.png" className="absolute top-0 left-0"/>
          }
        </div>
      </div>

      <div className="">
        <Piano
          setIsPlayingPianoL={setIsPlayingPianoL}
          setIsPlayingPianoR={setIsPlayingPianoR}
        />
      </div>
    </div>

    <footer>
    </footer>
  </>;
}
