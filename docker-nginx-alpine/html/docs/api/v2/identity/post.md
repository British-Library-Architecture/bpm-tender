home[home](/home) | [identity](/docs/api/v2/identity)

## /identity

`POST /api/v2/identity`

Create an  `/identity` resource

### Examples: 

[curl -i -X POST localhost/api/v2/identity/newuser/newpasword](/api/v2/identity)


### Return:
```html
HTTP/1.1 201 Created
Server: nginx
Date: Wed, 27 Sep 2017 16:24:17 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 36
Connection: keep-alive
X-Powered-By: Express
ETag: W/"24-O6mDxzCl4jQbkERs1zZ+LUxRNPU"
```

### Result Codes
Status code|Result
---|---
201|OK - Resource created
406|Error - Not Acceptable
500 or timeout|Error - `/identity` service failure. Not available
