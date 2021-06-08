import { AthenaCosmeticItemDefinition } from "./AthenaCosmeticItemDefinition";
import { FPackageIndex } from "../../ue4/objects/uobject/ObjectResource";

export class AthenaCharacterPartItemDefinition extends AthenaCosmeticItemDefinition {
    public CharacterParts: FPackageIndex[] /*CustomCharacterPart[]*/;
}