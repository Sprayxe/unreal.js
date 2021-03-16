import { FArchive } from "../../reader/FArchive";

export class FPakArchive extends FArchive {
    fd: number

    constructor(fd: number) {
        super()
        this.fd = fd
    }
}