# unreal.js
This was an attempt to write a pak reader in (almost) pure javascript!\
Inspired by: https://github.com/FabianFG/JFortniteParse\


I stopped working on it because of javascript's integer limitations.\
It comes to the point where reading buffers is becoming inaccurate because numbers are being rounded.\
I am aware that "BigInt" exists (which can hold bigger numbers as the normal "Number" type) but it is rarely used and mostly leads to errors...

Some stuff works though :D (listing directories seemed to work, also the output of `npm test` was good!)\
I decided to open-source it because maybe someone decides to try fixing it.

I am not really providing support for this, but if anyone has questions, you can contact me on:\
1. Twitter => `@Sprayxe_`\
2. Discord => `@MarcelWRLD#0999`\

Thanks and have a nice day!
