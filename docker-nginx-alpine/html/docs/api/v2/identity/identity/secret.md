[home](/home) | [identity](/docs/api/v2/identity)

## /identity/{identity}/{secret}

`GET /api/v2/identity/{identity}/{secret}`

Check the credentials of an `/identity` by the `{identity}` reference and the `{secret}` value

### Examples: 

[curl -i localhost/api/v2/identity/newuser/newpassword](/api/v2/identity/newuser/newpassword)


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
200|OK - `{identity}/{secret}` verified
403|Error - forbidden
404|Error - `{identity}/{secret}` invalid
500 or timeout|Error - `/identity` service failure. Not available
