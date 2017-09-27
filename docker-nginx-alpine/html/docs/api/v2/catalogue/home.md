[home](/home) | [catalogue](/docs/api/v2/catalogue)

## /catalogue

`GET /api/v2/catalogue`

Return the status of the `/catalogue` service

### Examples: 

[curl -i /api/v2/catalogue](/api/v2/catalogue)


### Return:
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
200|OK - `/catalogue` service available
403|Error - forbidden
500 or timeout|Error - `/catalogue` service failure. Not available
