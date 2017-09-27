[home](/home) | [catalogue](/docs/api/v2/catalogue)

## /catalogue/{isbn}

`GET /api/v2/catalogue/isbn/{isbn}`

Return metadata details of a catalogue by the `{isbn}` reference where an ISBN is a 13 digit numeric value

### Examples: 

[curl -i localhost/api/v2/catalogue/isbn/9780224063784](/api/v2/catalogue/isbn/9780224063784)


### Return:
```json
HTTP/1.1 200 OK
Server: nginx
Date: Wed, 27 Sep 2017 16:17:01 GMT
Content-Type: application/json; charset=utf-8
Content-Length: 316
Connection: keep-alive
X-Powered-By: Express
ETag: W/"13c-fza4Djc0qvbm3ZWO6Xi2RLtyj2Y"

{
    "service":"catalogue",
    "search":"ISBN",
    "isbn":"9780224063784",
    "set_number":"056538",
    "set_size":0,
    "status":"OK",
    "result":{
        "isbn":"9780224063784",
        "author":"Haddon, Mark,",
        "title":"The curious incident of the dog in the night-time /",
        "format":"271 p. : ill., maps ; 23 cm.",
        "publisher":"undefined undefined undefined"
        }
}
```

### Result Codes
Status code|Result
---|---
200|OK - Catalogue entry found
400|Error - Bad request. Typically the ISBN is invalid
404|Error - Not found. ISBN not referenced in the catalogue
500 or timeout|Error - `/catalogue` service failure. Not available
