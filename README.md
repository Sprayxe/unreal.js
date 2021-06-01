# unreal.js
## A pak reader for games like VALORANT & Fortnite written in Node.JS

### Prerequisites 
- Node.JS installed
- Experience with JavaScript or TypeScript

### Installation 
`npm i unreal.js --save`

### Usage
1. FileProvider
The fileprovider is basically the heart of the library which is used for loading files.\
Fortnite:
```js
const { FileProvider } = require("unreal.js")
// Create a new instance
const provider = new FileProvider(GAMEPATH)
// 'start' the new instance 
await provider.initialize()
``` // Do the rest here Loll

