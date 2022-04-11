import React from 'react';
import Head from 'next/head';
//import { Howl, Howler } from 'howler';

import Drums from '../components/Drums';
import Piano from '../components/Piano';
import Bongo from '../components/Bongo';

export default function Home() {
  const [isPlayingDrumsL, setIsPlayingDrumsL] = React.useState(false);
  const [isPlayingDrumsR, setIsPlayingDrumsR] = React.useState(false);

  const [isPlayingPianoL, setIsPlayingPianoL] = React.useState(false);
  const [isPlayingPianoR, setIsPlayingPianoR] = React.useState(false);

  const [isPlayingBongoL, setIsPlayingBongoL] = React.useState(false);
  const [isPlayingBongoR, setIsPlayingBongoR] = React.useState(false);

  // TODO: use tab to switch instruments

  return <>
    <Head>
      <title>Bongo Cat</title>
      <meta name="description" content="by @linkai101 on github" />
    </Head>


    <div className="h-screen h-screen-safari overflow-auto bg-stone-900">
      <div className="container max-w-2xl h-80 relative">
        <hr className="absolute w-full top-1/2 origin-center rotate-12 bg-stone-50 border-2 border-stone-50 rounded-md"/>

        {/* DRUMS */}
        <div className="absolute h-1/2 aspect-[3/2]" style={{ top: "18%", left: "3%" }}>
          <img src="/assets/images/bongocat/cat.png" className="absolute top-0 left-0"/>
          <img src="/assets/images/bongocat/mouth.png" className="absolute top-0 left-0"/>
          {isPlayingDrumsL ?
            <img src="/assets/images/bongocat/paw_left_down.png" className="absolute top-0 left-0"/>
          :
            <img src="/assets/images/bongocat/paw_left_up.png" className="absolute top-0 left-0"/>
          }
          {isPlayingDrumsR ?
            <img src="/assets/images/bongocat/paw_right_down.png" className="absolute top-0 left-0"/>
          :
            <img src="/assets/images/bongocat/paw_right_up.png" className="absolute top-0 left-0"/>
          }
          <img src="/assets/images/bongocat/drums.png" className="absolute top-0 left-0"/>
        </div>

        {/* PIANO */}
        <div className="absolute h-1/2 aspect-[3/2]" style={{ top: "30%", left: "30%" }}>
          <img src="/assets/images/bongocat/keyboard.png" className="absolute top-0 left-0"/>
          <img src="/assets/images/bongocat/cat.png" className="absolute top-0 left-0"/>
          <img src="/assets/images/bongocat/mouth.png" className="absolute top-0 left-0"/>
          {isPlayingPianoL ?
            <img src="/assets/images/bongocat/paw_left_down.png" className="absolute top-0 left-0"/>
          :
            <img src="/assets/images/bongocat/paw_left_up.png" className="absolute top-0 left-0"/>
          }
          {isPlayingPianoR ?
            <img src="/assets/images/bongocat/paw_right_down.png" className="absolute top-0 left-0"/>
          :
            <img src="/assets/images/bongocat/paw_right_up.png" className="absolute top-0 left-0"/>
          }
        </div>
        
        {/* BONGO */}
        <div className="absolute h-1/2 aspect-[3/2]" style={{ top: "42%", left: "58%" }}>
          <img src="/assets/images/bongocat/bongo.png" className="absolute top-0 left-0"/>
          <img src="/assets/images/bongocat/cat.png" className="absolute top-0 left-0"/>
          <img src="/assets/images/bongocat/mouth.png" className="absolute top-0 left-0"/>
          {isPlayingBongoL ?
            <img src="/assets/images/bongocat/paw_left_down.png" className="absolute top-0 left-0"/>
          :
            <img src="/assets/images/bongocat/paw_left_up.png" className="absolute top-0 left-0"/>
          }
          {isPlayingBongoR ?
            <img src="/assets/images/bongocat/paw_right_down.png" className="absolute top-0 left-0"/>
          :
            <img src="/assets/images/bongocat/paw_right_up.png" className="absolute top-0 left-0"/>
          }
        </div>
      </div>
      
      <div className="flex flex-col py-6 gap-8">
        <Drums
          setIsPlayingDrumsL={setIsPlayingDrumsL}
          setIsPlayingDrumsR={setIsPlayingDrumsR}
        />

        <Piano
          setIsPlayingPianoL={setIsPlayingPianoL}
          setIsPlayingPianoR={setIsPlayingPianoR}
        />

        <Bongo
          setIsPlayingBongoL={setIsPlayingBongoL}
          setIsPlayingBongoR={setIsPlayingBongoR}
        />
      </div>
    </div>

    <footer>
    </footer>
  </>;
}
