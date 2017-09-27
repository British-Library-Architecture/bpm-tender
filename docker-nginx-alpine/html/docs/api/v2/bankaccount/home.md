[home](/home) | [bankaccount](/docs/api/v2/bankaccount)

## /bankaccount

`GET /api/v2/bankaccount`

Return the status of the `/bankaccount` service

### Examples: 

[curl -i localhost/api/v2/bankaccount](/api/v2/bankaccount)


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
200|OK - `/bankaccount` service available
403|Error - forbidden
500 or timeout|Error - `/bankaccount` service failure. Not available
