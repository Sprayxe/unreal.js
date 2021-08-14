[![LICENCE](https://img.shields.io/github/license/Ileriayo/markdown-badges?style=for-the-badge)](./LICENSE)
[![TYPESCRIPT](https://img.shields.io/badge/typescript-%23007ACC.svg?&style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![JAVASCRIPT](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![NODEJS](https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white)](https://www.nodejs.org)
[![DISCORD0](https://img.shields.io/badge/Discord%20Server-%237289DA.svg?&style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/b2H6EGAmdQ)\
[![NPM](https://nodei.co/npm/unreal.js.png)](https://npmjs.com/package/unreal.js)

![LOGO_0](https://media.discordapp.net/attachments/833965731279929365/853716847203844106/image0.png)

# unreal.js
## A pak reader for games like [VALORANT](https://playvalorant.com) & [Fortnite](https://fortnite.com) written in Node.JS

### Notice
This library is in VERY early development so it might be unstable. **Please also keep in mind that JavaScript is not really made for this kind of stuff so the usage of this library is experimental**. We still try fixing most issues though so report if you experience any!\

### Features
- Easy2use file provider for fast interaction with pak/asset files
- Supports loading of UE4 pak files
- Supports loading of UE4 asset files (.uasset, .umap, .uexp, .ubulk)
- Supports loading of .locres files
- Supports loading of AssetRegistry.bin
- Supports exporting of UE4 textures as image
- Supports exporting of UE4 sounds files

### Prerequisites 
- Node.JS/NPM installed
- **Experience with JavaScript or TypeScript**
- Python, Visual C++ Build Tools (node-gyp dependencies)

### Installation 
`npm i unreal.js`\
This library has optional dependencies like `canvas` and `dxt-js` which are used in ue4 texture conversion. If you don't want to install these dependencies, use: `npm i unreal.js --no-optional`.

### Documentation
[Here](https://unreal.js.org)

### Usage
#### Basics: FileProvider
The file provider is basically the heart of the library and from there you control basically all features.

**IMPORTANT**: When using the library with **Fortnite V14.40 and above**, you need `oo2core_8_win64.dll` present in your working directory (you can download it using `Oodle.downloadDLL()`). You will also need a [.usmap mappings](https://benbot.app/api/v1/mappings) file corresponding to your fortnite version.\
You will also experience longer mounting times than e.g VALORANT.
- **Usage with Fortnite**
    ```js
    // Create new instance
    const usmap = new UsmapTypeMappingsProvider(readFileSync("USMAPPATH"))
    const provider = new FileProvider("GAMEPATH", VERSION, usmap)
    provider.mappingsProvider.reload() // Loads .usmap
    // Setting this to '0' will skip reading directory index
    // Means it will not populate .utoc file entries, so <FIoStoreReader>.getFiles() will be empty
    // Leaving it to default value will slightly increase pak mounting time
    provider.ioStoreTocReadOptions = 0
    // 'start' the provider
    await provider.initialize()
    // submit aes key to decrypt paks
    await provider.submitKey(FGuid.mainGuid, "KEY")
    ```
    Replace:
    - `USMAPPATH`: Path to your .usmap file (doesn't need to be in working dir)
    - `VERSION`: Version you want to use (e.g `Ue4Version.GAME_UE4_26`, pass `null` for latest)
    - `GAMEPATH`: Path to fortnite's paks
    - `KEY`: An [aes key](https://benbot.app/api/v1/aes) corresponding to your version
   

- **Usage with VALORANT**
   ```js
    // Create new instance 
    const provider = new FileProvider("GAMEPATH", Ue4Version.GAME_VALORANT)
    // 'start' the provider
    await provider.initialize()
    // submit aes key to decrypt paks
    await provider.submitKey(FGuid.mainGuid, "0x4BE71AF2459CF83899EC9DC2CB60E22AC4B3047E0211034BBABE9D174C069DD6")
   ```
   Replace:
   - `GAMEPATH`: Path to valorant's paks
   
#### Basics: Loading an asset
- **Loading whole file**
  ```js
   const pkg = provider.loadGameFile("PATH") // loads the file
   console.log(pkg.toJson()) // turns file into json format
  ```
  Replace:
  - `PATH`: Path to the file you want to load
   

- **Loading specific object from file**
  ```js
  const obj = provider.loadObject("PATH", "OBJECTNAME") // loads the object
  console.log(pkg.toJson()) // turns object into json format
  ```
  Replace:
  - `PATH`: Path to the file you want to load
  - `OBJECTNAME`: Name of the object to load\
   You can leave this parameter out if you provide the object name as file extension

#### Basics: Exporting sounds
- **Exporting a sound wave**
  ```js
  // this will find an export which matches the class 'USoundWave'
  const sound = pkg.getExportOfType(USoundWave)
  // use 'pkg.getExportOfTypeOrNull(USoundWave)' if you check for undefined/null manually
  const wave = SoundWave.convert(sound) // converts USoundWave to a usable file
  // write it to a file
  writeFileSync(`MySoundFile.${wave.format}`, wave.data)
  ```


- **Exporting wwise audio (VALORANT)**
  ```js
  // this will find an export which matches the class 'UAkMediaAssetData'
  const mediaData = pkg.getExportOfType(UAkMediaAssetData)
  const wwise = WwiseAudio.convert(mediaData) // Converts it to a .wem file
  // write it to a file
  writeFileSync(`MySoundFile.${wwise.format}`, wwise.data)
  ```
  **IMPORTANT**: `.wem` are not playable by windows, you have to convert it to a `.wav` file first!\
  Unreal.JS is able to do that with [vgmstream](https://github.com/vgmstream/vgmstream). Download the zip file from [here](https://drive.google.com/file/d/1Fed4ba_FvegUgeIXCgnlcoUzoABC-ZxX/view?usp=sharing),
  create a folder called 'vgm' in your working directory and extract all files into it. Then do:
  ```js
  // this will find an export which matches the class 'UAkMediaAssetData'
  const mediaData = pkg.getExportOfType(UAkMediaAssetData)
  const wwise = WwiseAudio.convert(mediaData) // Converts it to a .wem file
  // converts and exports it as playable .wav file
  wwise.export() // you can pass an output path (must include whole path with filename and extension)
  ```

#### Basics: Exporting textures
```js
  // this will find an export which matches the class 'UTexture2D'
  const tex = pkg.getExportOfType(UTexture2D)
  // use 'pkg.getExportOfTypeOrNull(UTexture2D)' if you check for undefined/null manually
  const image = Image.convert(tex) // converts texture to image (import Image class from unreal.js)
  // writes it it a file
  writeFileSync("image.png", image)
  ```

#### Basics: Loading locres
- **Loading by file path**   
   ```js
   const locres = provider.loadLocres("PATH") // loads the locres file
   console.log(locres.toJson()) // turns locres into json format 
   ```
  Replace:
  - `PATH`: Path to the .locres file


- **Loading by enum**
  ```js
  const locres = provider.loadLocres(FnLanguage.DE) // loads using enum
  console.log(locres.toJson()) // turns locres into json format 
  ```  
  
#### Advanced: Loading a pak file manually
```js
const reader = new PakFileReader("PATH", GAME) // Create a new instance
reader.aesKey = "KEY" // Set an aes key (can be left out if pak is not encrypted)
reader.readIndex() // Read the index
reader.extract(reader.files.first()) // Gets the first file and extracts it as Buffer
```
Replace:
- `PATH`: Path to the pak file
- `GAME`: Game version you are using (e.g `Ue4Version.GAME_UE4_26`)\
  You can leave it out if you want to use the latest version
- `KEY`: Aes key used for decrypting the pak\
  **WARNING** Using a wrong aes key will throw an exception! You can use `reader.testAesKey("KEY")` to test if it works (returns a boolean)

#### Advanced: Loading a package manually
```js
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
- `GAME`: Version of the game you are using (e.g `Ue4Version.GAME_VALORANT`, optional in both)
- `PACKAGEID`: The id of the io package
- `STOREENTRY`: Instance of the io package's `FPackageStoreEntry`
- `GLOBALPACKAGESTORE`: The file provider's `FPackageStore` object

## Support, Feedback, Contact
- Discord: **MarcelWRLD#0742**
- Twitter: **Sprayxe_**

## Inspiration
- [JFortniteParse](https://github.com/FabianFG/JFortniteParse)
- [CUE4Parse](https://github.com/FabianFG/CUE4Parse)


![LOGO_1](https://media.discordapp.net/attachments/833965731279929365/853716847430074368/image1.png)
