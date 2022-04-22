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

`KVNamespaceGetOptions<"text">` is available as query parameter.

### PUT `/{key}`

Sets the value of the key.

`KVNamespacePutOptions` is available as query parameter.

### DELETE `/{key}`

Deletes the key if it exists.

### LIST `/`

List all data, in `KVNamespaceListResult` format.


## License

Opensource under `GPLv3`, please refer to `LICENSE`.
