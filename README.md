# UnsafeKV

Expose Cloudflare KV as RESTful API endpoint.

## Develop

```
yarn install
yarn build
```

Emitted asset will be available at `/dist` 

## Demo

`https://unsafekv.zxilly.workers.dev`

## Endpoint

### GET `/{key}`

Returns the value of the key, if exists.

[`KVNamespaceGetOptions<"text">`](https://github.com/cloudflare/workers-types/blob/fab61eda806db2aa689d39a8861256cfe1dc473c/overrides/kv.d.ts#L1) is available as query parameter.

### PUT `/{key}`

Sets the value of the key.

[`KVNamespacePutOptions`](https://github.com/cloudflare/workers-types/blob/fab61eda806db2aa689d39a8861256cfe1dc473c/index.d.ts#L954) is available as query parameter.

### DELETE `/{key}`

Deletes the key if it exists.

### LIST `/`

List all data, in [`KVNamespaceListResult`](https://github.com/cloudflare/workers-types/blob/fab61eda806db2aa689d39a8861256cfe1dc473c/index.d.ts#L948) format.

[`KVNamespaceListOptions`](https://github.com/cloudflare/workers-types/blob/fab61eda806db2aa689d39a8861256cfe1dc473c/index.d.ts#L942) is available as query parameter.

## License

Opensource under `GPLv3`, please refer to `LICENSE`.
