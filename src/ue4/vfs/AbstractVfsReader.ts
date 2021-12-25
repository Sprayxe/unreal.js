import { VersionContainer } from "../versions/VersionContainer";
import { GameFile } from "../pak/GameFile";
import { Utils } from "../../util/Utils";
import { FByteArchive } from "../reader/FByteArchive";

export abstract class AbstractVfsReader {
    public path: string
    public versions: VersionContainer
    public name: string

    protected constructor(path: string, versions: VersionContainer) {
        this.path = path
        this.versions = versions
        const _path = Utils.replaceAll(path, "\\", "/")
        this.name = _path.substring(_path.lastIndexOf("/") + 1)
    }

    public files: GameFile[] = []

    public get fileCount(): number {
        return this.files.length
    }

    public abstract get hasDirectoryIndex(): boolean

    public mountPoint: string = ""
    public concurrent: boolean = false

    public get game(): number {
        return this.versions.game
    }

    public set game(v: number) {
        this.versions.game = v
    }

    public get ver(): number {
        return this.versions.ver
    }

    public set ver(v: number) {
        this.versions.ver = v
    }

    public abstract readIndex(): GameFile[]

    public abstract extract(gameFile: GameFile): Buffer

    protected validateMountPoint(mountPoint: string): string {
        let badMountPoint = !mountPoint.startsWith("../../..")
        mountPoint = mountPoint.substring(mountPoint.indexOf("../../.." + "../../..".length))
        if (mountPoint[0] != "/" || (mountPoint.length > 1 && mountPoint[1] == "."))
            badMountPoint = true
        if (badMountPoint) {
            // warn
            mountPoint = "/"
        }
        if (mountPoint.startsWith("/"))
            mountPoint = mountPoint.substring(1)
        return mountPoint
    }

    public static readonly MAX_MOUNTPOINT_TEST_LENGTH = 128

    public static isValidIndex(source: Buffer | FByteArchive): boolean {
        if (Buffer.isBuffer(source))
            return this.isValidIndex(new FByteArchive(source))

        const stringLength = source.readInt32()
        if (stringLength > this.MAX_MOUNTPOINT_TEST_LENGTH || stringLength < -this.MAX_MOUNTPOINT_TEST_LENGTH)
            return false
        // Calculate the pos of the null terminator for this string
        // Then read the null terminator byte and check whether it is actually 0
        if (stringLength === 0)
            return source.readInt8() === 0
        if (stringLength < 0) {
            // UTF16
            source.pos = 4 - (stringLength - 1) * 2
            return source.readInt16() === 0
        }
        // UTF8
        source.pos = 4 + stringLength - 1
        return source.readInt8() === 0
    }

    public toString(): string {
        return this.path
    }
}