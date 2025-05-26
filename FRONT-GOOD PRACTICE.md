# Good Practice :

## Code Organisation : 

### FileSystem
* my-app

>>>STATIC PART OF THE APP
  * public
    * cursors
      * hand.cur
    * data -- *Is it the good one???*
      * postalCodesBE.json
    * image
      * assets
        * *AllGraphicalDate*
      * avatars
        * *AllAIGeneratedAvatar*
      * divers
       * gifs
      * icons
        * *AllIconsOfTheProject*

>>> DYNAMIC PART OF THE APP
  * src
    * app
      * *PageFolder*
        * page.tsx
      * layout.tsx
      * global.css
    * data -- *Is it the good one???*
      * postalCodesBE.json
    * components -- *We are using Atomic system, if you want more info : https://bradfrost.com/blog/post/atomic-web-design/*
      * Atom
        * *SmallestComponents.tsx*
        * *SuchAsButtonOrCard.tsx*
      * Molecule
        * *SmallComponents.tsx*
        * *SuchAsPopupOrMadal.tsx*
      * Organism
        * *ComplexComponents.tsx*
        * *SuchAsParcelsLinesOrProfile.tsx*
      * Page
        * *PageComponents.tsx*
      * UI
        * *OldUIComponents.tsx*
        * *ProbablyToDelete.tsx*
      * *DiversStuffToClean.tsx*
    * redux
      * api
        * api.ts
        * fetch.ts
      * auth
        * authSlice.ts
      * display
        * displaySlice.ts
      * garden 
        * gardenSlice.ts
      * user
        * userSlice.ts
    * utils
      * types.ts
      * Xp.ts
      * *DifferentCookiesFiles.ts*
    * middleware.ts
    * .env
    * .prettierrc
    * eslint.config.mjs


### Component Organisation System

All Your component should be organise on the same way to permit to anyone to understand the codebase.
Please, don't forget to comment each part of your code as below.

```js
import WhatEverYouWant from WhereEverYouWant
import TypeYouNeed from '../utils/types.ts'

const YourComponent = () => {
  //Local Variable

  //Selectors

  //Hooks

  //RTK Query

  //Redux

  //Handler

  //Debug

  return (
    your jsx just here
   )
}
export default YourComponent
```

### Type
As we are using typescript we should try to externalise all the types we are using to easily update a type if we need to.
Considere using '/utils/types.ts' as the best way to type your variables.
Please use this formate : 
```js
export type Garden = {
  id: number;
  authorId: number;
  name: string;
  deleted: boolean;
  description: string;
  latitude: number;
  longitude: number;
  length: number;
  width: number;
  createdAt: string;
  privacy: number;
  type: number;
  constributors: string[]; 
  followers: string[];
  parcels: Parcel[];
  plantNurseries: Nursery[];
  tagsInterests: Tag[];
  log?: Log[];
};
```
You should not use Interface!!

### Naming Conventiion
We Use ES6 convention >> https://github.com/elierotenberg/coding-styles/blob/master/es6.md


