import { FName } from "../uobject/FName";

export class FGameplayTag {
    public TagName: FName
    constructor(TagName: FName = FName.NAME_None) {
        this.TagName = TagName
    }

    toString() {
        return this.TagName.text
    }
}