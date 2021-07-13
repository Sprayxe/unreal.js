// source: https://github.com/NotOfficer/EpicManifestParser/blob/master/src/EpicManifestParser/Objects/ManifestInfo.cs

/**
 * Parser for manifest response from epic's api
 */
export class Manifest {
    public appName: string
    public labelName: string
    public buildVersion: string
    public version: number
    public CL: number
    public hash: string
    public uri: string
    public fileName: string

    constructor(json: string | object) {
        const root = (typeof json === "string" ? JSON.parse(json) : json).elements[0]
        this.appName = root.appName
        this.labelName = root.labelName
        this.buildVersion = root.buildVersion
        this.hash = root.hash

        const buildMatch = this.buildVersion.matchAll(RegExp("(\d+(?:\.\d+)+)-CL-(\d+)", "gs"))
        // TODO port rest
    }
}