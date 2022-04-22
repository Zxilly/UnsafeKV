import {
    assertKeyNotNone,
    CORSResponse,
    toKVNamespaceGetOptions,
    toKVNamespaceListOptions,
    toKVNamespacePutOptions,
    toObject
} from "./utils";

let protect = true;

try {
    TOKEN
} catch (e) {
    if (e instanceof ReferenceError) {
        protect = false;
    }
}

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request).catch((err: Error) => {
        console.error(err);
        return new Response(err.message, {status: 500})
    }));
});

export type stringDict = { [key: string]: string };

async function handleRequest(request: Request): Promise<Response> {
    if (protect) {
        const token = request.headers.get("Token");
        if (token !== TOKEN) {
            return new Response("Unauthorized", {status: 401})
        }
    }

    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    const options = toObject<string>(url.searchParams.entries());
    const value = await request.text();
    const method = request.method;
    switch (method) {
        case "GET":
            if (key === "") {
                return await list(options);
            } else {
                return await get(key, options);
            }
        case "PUT":
            return assertKeyNotNone(key, async () => put(key, value, options));
        case "DELETE":
            return assertKeyNotNone(key, async () => del(key));
        case "OPTIONS":
        case "HEAD":
            const resp = new CORSResponse("", {status: 200});
            resp.headers.set("Allow", "GET, PUT, DELETE, OPTIONS, HEAD");
            return resp;
    }
    return new CORSResponse("Method not allowed", {status: 405});
}

async function get(key: string, options: stringDict): Promise<Response> {
    const result = await UnsafeKV.get(key, toKVNamespaceGetOptions(options));
    if (result) {
        return new CORSResponse(result, {status: 200});
    } else {
        return new CORSResponse("Not found", {status: 404});
    }
}

async function put(key: string, value: string, options: stringDict): Promise<Response> {
    await UnsafeKV.put(key, value, toKVNamespacePutOptions(options));
    return new CORSResponse("OK", {status: 200});
}

async function del(key: string): Promise<Response> {
    if (!(await UnsafeKV.get(key))) {
        return new CORSResponse("Not found", {status: 404});
    } else {
        await UnsafeKV.delete(key);
        return new CORSResponse("OK", {status: 200});
    }
}

async function list(options: stringDict): Promise<Response> {
    const result = await UnsafeKV.list(toKVNamespaceListOptions(options)) || {};
    return new Response(JSON.stringify(result), {status: 200});
}




