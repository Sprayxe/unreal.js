# unreal.js
## A pak reader for games like [VALORANT](https://playvalorant.com) & [Fortnite](https://fortnite.com) written in Node.JS

### Features
- Easy2use file provider for fast interaction with pak/asset files
- Supports loading of UE4 pak files
- Supports loading of UE4 asset files (.uasset, .umap, .uexp, .ubulk)
- Supports loading of .locres files
- Supports loading of AssetRegistry.bin  
- Supports exporting of UE4 textures as image (TODO) 
- Supports exporting of UE4 sounds files (TODO)

### Prerequisites 
- Node.JS installed
- **Experience with JavaScript or TypeScript**

### Installation 
`npm i unreal.js --save`

### Usage
#### Basics: FileProvider
The file provider is basically the heart of the library and from there you control basically all features.
- **Usage with Fortnite**
    ```js
    // Require library and create new instance
    const { FileProvider, FGuid } = require("unreal.js")
    const provider = new FileProvider("GAMEPATH")
    // 'start' the provider
    provider.populateIoStoreFiles = true
    await provider.initialize()
    // submit aes key to decrypt paks
    await provider.submitKey(FGuid.mainGuid, "KEY")
    ```
    Replace:
    - `GAMEPATH`: Path to fortnite's paks
    - `KEY`: Current main [aes key](https://benbot.app/api/v1/aes)
   

- **Usage with VALORANT**
   ```js
    // Require library and create new instance
    const { FileProvider, FGuid, Game } = require("unreal.js")
    const provider = new FileProvider("GAMEPATH", Game.GAME_VALORANT)
    // 'start' the provider
    await provider.initialize()
    // submit aes key to decrypt paks
    await provider.submitKey(FGuid.mainGuid, "0x4BE71AF2459CF83899EC9DC2CB60E22AC4B3047E0211034BBABE9D174C069DD6")
   ```
   Replace:
   - `GAMEPATH`: Path to valorant's paks

<br> 
   
#### Load an asset
- **Load whole file**
  ```js
   const pkg = provider.loadGameFile("PATH") // loads the file
   console.log(pkg.toJson()) // turns file into json format
  ```
  Replace:
  - `PATH`: Path to the file you want to load
   

- **Load specific object from file**
  ```js
  const obj = provider.loadObject("PATH", "OBJECTNAME") // loads the object
  console.log(pkg.toJson()) // turns object into json format
  ```
  Replace:
  - `PATH`: Path to the file you want to load
  - `OBJECTNAME`: Name of the object to load\
   You can leave this parameter out if you provide the object name as file extension\

TODO: Textures, Soundwaves, ItemDefinitions  

<br>

#### Load locres
- **By file path**   
   ```js
   const locres = provider.loadLocres("PATH") // loads the locres file
   console.log(locres.toJson()) // turns locres into json format 
   ```
  Replace:
  - `PATH`: Path to the .locres file


- **By enum**
  ```js
  const { FnLanguage } = require("unreal.js") // requires the language enum
  const locres = provider.loadLocres(FnLanguage.DE) // loads using enum
  console.log(locres.toJson()) // turns locres into json format 
  ```
  
<br>
  
#### Load a pak file manually
```js
const { PakFileReader } = require("unreal.js") // Require the reader
const reader = new PakFileReader("PATH", "GAME") // Create a new instance
reader.aesKey = "KEY" // Set an aes key (can be left out if pak is not encrypted)
reader.readIndex() // Read the index
reader.extract(reader.files.first()) // Gets the first file and extracts it as Buffer
```
Replace:
- `PATH`: Path to the pak file
- `GAME`: Game version you are using (e.g `Game.GAME_VALORANT`)\
  You can leave it out if you want to use the latest version
- `KEY`: Aes key used for decrypting the pak\
  **WARNING** Using a wrong aes key will throw an exception! You can\
  use `reader.testAesKey("KEY")` to test if it works (returns a boolean)
  
<br>

#### Load a package manually
```js
const { PakPackage, IoPackage } = require("unreal.js") // require package classes
// load a pak package (e.g valorant)
const pkg = new PakPackage(UASSETBUFFER, UEXPBUFFER, UBULKBUFFER, NAME, PROVIDER, GAME)
// load an io package (mostly used in fortnite)
const pkg2 = new IoPackage(UASSETBUFFER, PACKAGEID, STOREENTRY, GLOBALPACKAGESTORE, PROVIDER, GAME)
```
Replace:
- `UASSETBUFFER`: Buffer of the .uasset file
- `UEXPBUFFER`: Buffer of the .uexp file
- `UBULKBUFFER`: Buffer of the .ubulk file (pass `null` if it doesn't exist)
- `NAME`: Name of the package
- `PROVIDER`: Instance of a fileprovider (optional in `PakPackage`)
- `GAME`: Version of the game you are using (e.g `Game.GAME_VALORANT`, optional in both)
- `PACKAGEID`: The id of the io package
- `STOREENTRY`: Instance of the io package's `FPackageStoreEntry`
- `GLOBALPACKAGESTORE`: The file provider's `FPackageStore` object


## Support, Feedback, Contact
- Discord
  - `@MarcelWRLD#0999` 
  - `@tb24#5219`
  - AK47 Server Invite?
- Twitter
  - [Sprayxe](https://twitter.com/@Sprayxe_)
  - [AmrSatrio](https://twitter.com/@AmrSatrio)

## Contributors
- [Sprayxe](https://twitter.com/@Sprayxe_)
- [AmrSatrio](https://twitter.com/@AmrSatrio)
- Inspired by [JFortniteParse](https://github.com/JFortniteParse)
  - [FunGames](https://twitter.com/FunGamesLeaks)
  
## Donate
- [PayPal] TODO: PUT LINK HERE     > prob some fancy readme badge :bonk:
- [Bitcoin] TODO: PUT ADDRESS HERE ^

## Dependencies
- [typescript](https://npmjs.com/typescript)
- [sprintf-js](https://npmjs.com/sprintf-js)
- [ref-napi](https://npmjs.com/ref-napi)
- [ffi-napi](https://npmjs.com/ffi-napi)
- [long](https://npmjs.com/long)
- [aes-js](https://npmjs.com/aes-js)
- [bitset](https://npmjs.com/bitset)  
- [stream-buffers](https://npmjs.com/stream-buffers)
- [os-locale](https://npmjs.com/os-locale)
- [bezier-js](https://npmjs.com/bezier-js)  
- [@discordjs/collection](https://npmjs.com/@discordjs/collection)