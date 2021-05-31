import { FRotationTranslationMatrix } from "./FRotationTranslationMatrix";
import { FRotator } from "./FRotator";
import { FVector } from "./FVector";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class FRotationMatrix extends FRotationTranslationMatrix implements IStructType {
    /**
     * Constructor.
     *
     * @param rot rotation
     */
    constructor(rot: FRotator) {
        super(rot, new FVector(0, 0, 0))
    }

    toJson(): any {
        return this.m
    }
}