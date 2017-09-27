[home](/home) | [identity](/docs/api/v2/identity)

## /identity

`GET /api/v2/identity`

Return the status of the `/identity` service

### Example: The `/identity` service is available

[curl -i localhost/api/v2/identity](/api/v2/identity)

```html
HTTP/1.1 200 OK
Server: nginx
Date: Wed, 27 Sep 2017 12:48:10 GMT
Content-Type: application/xml
Content-Length: 484
Last-Modified: Wed, 27 Sep 2017 12:02:40 GMT
Connection: keep-alive
ETag: "59cb9360-1e4"
Accept-Ranges: bytes

OK
```

### Result Codes
Status code|Result
---|---
200|OK - `/identity` service available
500 or timeout|Error - `/identity` service failure. Not available
