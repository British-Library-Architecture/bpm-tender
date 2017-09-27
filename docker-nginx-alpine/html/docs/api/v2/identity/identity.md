[home](/home) | [identity](/docs/api/v2/identity)

## /identity/{identity}

`GET /api/v2/identity/{identity}`

Check the existance of an `/identity` by the `{identity}` reference

### Examples: 

[curl -i localhost/api/v2/identity/newuser](/api/v2/identity/newuser)


### Return:
```json
HTTP/1.1 200 OK
Server: nginx
Date: Wed, 27 Sep 2017 16:56:28 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 36
Connection: keep-alive
X-Powered-By: Express
ETag: W/"24-O6mDxzCl4jQbkERs1zZ+LUxRNPU"

{
    "identity":"newuser",
    "status":"OK"
}
```

### Result Codes
Status code|Result
---|---
200|OK - `/identity` service available
403|Error - forbidden
404|Error - resource not found
500 or timeout|Error - `/identity` service failure. Not available
