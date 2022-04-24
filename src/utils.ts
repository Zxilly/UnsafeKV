import {stringDict} from "./index";

export function toObject<T>(iterable: Iterable<[string, T]>): { [key: string]: T } {
    return [...iterable].reduce((obj: any, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
}

export async function assertKeyNotNone(key: string, resp: () => Promise<Response>, errResp: Response | null = null): Promise<Response> {
    if (errResp === null) {
        errResp = new Response("Key is required", {status: 400});
    }
    if (key === "") {
        return errResp;
    }
    return resp();
}

export class CORSResponse extends Response {
    constructor(bodyInit?: BodyInit | null, maybeInit?: ResponseInit | Response) {
        super(bodyInit, maybeInit);
        this.headers.set("Access-Control-Allow-Origin", "*");
        this.headers.set("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS, HEAD");
        this.headers.set("Access-Control-Allow-Credentials", "true");
        this.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Token");
    }
}

export function toKVNamespaceGetOptions(options: stringDict): KVNamespaceGetOptions<"text"> {
    if (options.hasOwnProperty("cacheTtl")) {
        return {
            cacheTtl: parseInt(options.cacheTtl),
            type: "text",
        }
    } else {
        return {
            type: "text",
        }
    }
}

export function toKVNamespacePutOptions(options: stringDict): KVNamespacePutOptions | undefined {
    if (options.hasOwnProperty("expiration")) {
        return {
            expiration: parseInt(options.expiration),
        }
    } else if (options.hasOwnProperty("expirationTtl")) {
        return {
            expirationTtl: parseInt(options.expirationTtl),
        }
    } else {
        return undefined;
    }
}

export function toKVNamespaceListOptions(options: stringDict): KVNamespaceListOptions | undefined {
    const ret: KVNamespaceListOptions = {};
    if (options.hasOwnProperty("prefix")) {
        ret.prefix = options.prefix;
    }
    if (options.hasOwnProperty("limit")) {
        ret.limit = parseInt(options.limit);
    }
    if (options.hasOwnProperty("cursor")) {
        ret.cursor = options.cursor;
    }
    if (Object.keys(ret).length === 0) {
        return undefined;
    } else {
        return ret;
    }
}
