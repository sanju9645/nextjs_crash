npm create next-app@latest .

install dev dependancy

npm install --save-dev tw-animate-css

open layout.tsx and change the app metadata

export const metadata: Metadata = {
  title: "Dev Event",
  description: "The Hub for Every Dev Event You Mustn't Miss",
};

Change the font of of your app if needed.

in the layout.tsx change

import { Geist, Geist_Mono } from "next/font/google";

to

import { Schibsted_Grotesk, Martian_Mono } from "next/font/google";


https://reactbits.dev/backgrounds/light-rays

select cli

npx shadcn@latest add @react-bits/LightRays-JS-CSS

create the LightRays.tsx file in component folder and udpate the content as provided

include it in layout.tsx