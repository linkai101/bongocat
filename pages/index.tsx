import React from 'react';
import Head from 'next/head';
//import { Howl, Howler } from 'howler';

import Piano from '../components/Piano';
import Bongo from '../components/Bongo';

export default function Home() {
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

        {/* PIANO */}
        <div className="absolute h-2/3 aspect-[3/2]" style={{ bottom: "2%", right: "10%" }}>
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
        
        {/* BONGO */}
        <div className="absolute h-2/3 aspect-[3/2]" style={{ top: "14%", left: "4%" }}>
          <img src="/assets/images/bongo.png" className="absolute top-0 left-0"/>
          <img src="/assets/images/cat.png" className="absolute top-0 left-0"/>
          <img src="/assets/images/mouth.png" className="absolute top-0 left-0"/>
          {isPlayingBongoL ?
            <img src="/assets/images/paw_left_down.png" className="absolute top-0 left-0"/>
          :
            <img src="/assets/images/paw_left_up.png" className="absolute top-0 left-0"/>
          }
          {isPlayingBongoR ?
            <img src="/assets/images/paw_right_down.png" className="absolute top-0 left-0"/>
          :
            <img src="/assets/images/paw_right_up.png" className="absolute top-0 left-0"/>
          }
        </div>
      </div>
      
      <div className="flex flex-col py-6 gap-8">
        <div className="">
          <Piano
            setIsPlayingPianoL={setIsPlayingPianoL}
            setIsPlayingPianoR={setIsPlayingPianoR}
          />
        </div>

        <div className="">
          <Bongo
            setIsPlayingBongoL={setIsPlayingBongoL}
            setIsPlayingBongoR={setIsPlayingBongoR}
          />
        </div>
      </div>
    </div>

    <footer>
    </footer>
  </>;
}
