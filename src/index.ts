import {toKVNamespaceGetOptions, toKVNamespaceListOptions, toKVNamespacePutOptions, toObject} from "./utils";
import sourcemap from 'source-map-support';

sourcemap.install({
    handleUncaughtExceptions: true,
    environment: 'auto',
});

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request).catch((err:Error) => {
        console.error(err);
        console.log(sourcemap.getErrorSource(err))
        return new Response(err.stack, {status: 500})
    }));
});

export type stringDict = { [key: string]: string };

async function handleRequest(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    const options = toObject<string>(url.searchParams.entries());
    const value = await request.text();
    const method = request.method;
    switch (method) {
        case "GET":
            if (key.length === 0) {
                throw new Error("GET request must have a key");
            }
            return await get(key, options);
        case "PUT":
            return await put(key, value, options);
        case "DELETE":
            return await del(key);
        case "LIST":
            if (key !== "") {
                return new Response("LIST is only supported on /", {status: 400});
            }
            return await list(options);
    }
    return new Response("Method not allowed", {status: 405});
}

async function get(key: string, options: stringDict): Promise<Response> {
    const result = await UnsafeKV.get(key, toKVNamespaceGetOptions(options));
    if (result) {
        return new Response(result, {status: 200});
    } else {
        return new Response("Not found", {status: 404});
    }
}

async function put(key: string, value: string, options: stringDict): Promise<Response> {
    await UnsafeKV.put(key, value, toKVNamespacePutOptions(options));
    return new Response("OK", {status: 200});
}

async function del(key: string): Promise<Response> {
    if (!(await UnsafeKV.get(key))) {
        return new Response("Not found", {status: 404});
    } else {
        await UnsafeKV.delete(key);
        return new Response("OK", {status: 200});
    }
}

async function list(options: stringDict): Promise<Response> {
    const result = await UnsafeKV.list(toKVNamespaceListOptions(options));
    return new Response(JSON.stringify(result), {status: 200});
}




