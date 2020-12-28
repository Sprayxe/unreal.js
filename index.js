(async () => {
    const UnrealJS = require("./src/unreal");
    const unrealJS = new UnrealJS();

    const data = await unrealJS.readGlobalUtoc();
    console.log(data.toString("binary"));
})();