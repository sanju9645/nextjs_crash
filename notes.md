https://www.youtube.com/watch?v=I1V9YWqRIeI

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

after pushing all these changes, we need to implement posthog

so swicth to new branch

git checkout -b implement-posthog

posthog is used to 
1. track user behaviour
2. see features performance
3. monitor errors in realtime
4. capture valuable matrics
