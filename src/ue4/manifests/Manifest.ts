// source: https://github.com/NotOfficer/EpicManifestParser/blob/master/src/EpicManifestParser/Objects/ManifestInfo.cs

/**
 * Parser for manifest response from epic's api
 */
export class Manifest {
    public appName: string
    public labelName: string
    public buildVersion: string
    public version: string
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

        // fuck regexp
        const buildMatch = this.buildVersion
            .split("Release-")[1]
            ?.replace("-Windows", "")
            ?.split("-CL-")
        if (buildMatch && buildMatch.length) {
            this.version = buildMatch[0]
            this.CL = parseInt(buildMatch[1])
        }

        const manifests = root.manifests
        const manifestURLs: {base: string, full: string}[] = []

        for (const m of manifests) {
            let uri = {
                base: m.uri,
                full: m.uri
            }
            if (m.queryParams && m.queryParams.length) {
                for (const p of m.queryParams) {
                    const name = p.name
                    const value = p.value
                    const query = `${name}=${value}`
                    uri.full += (uri.full.includes("?") ? "&" : "") + query
                }
            }
            manifestURLs.push(uri)
        }

        const uri = manifestURLs.find(u => !u.full.includes("?")) || manifestURLs[0]
        this.uri = uri.full
        this.fileName = getUriPathSegments(this.uri).pop()
    }
}

function getUriPathSegments(uri: string) {
    const segments = []
    const base = uri
        .replace("https://", "")
        .replace("http://", "")
    const path = base.substring(base.indexOf("/"))
    const index = path.indexOf("/")
    if (index !== -1 && index !== path.length) {
        let current = 0
        while (current < path.length) {
            let next = path.indexOf("/", current)
            if (next === -1) {
                next = path.length - 1
            }
            segments.push(path.substring(current, next + 1))
            current = next + 1
        }
    }
    return segments
}