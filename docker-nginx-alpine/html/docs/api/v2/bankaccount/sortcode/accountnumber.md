[home](/home) | [bankaccount](/docs/api/v2/bankaccount)

## /bankaccount/{sortcode}/{accountnumber}

`GET /api/v2/bankaccount/<sortcode>/<accountnumber>`

Return the details of a bank `<sortcode>` and `<accountnumber>` combination

### Examples: 

[curl -i localhost/api/v2/bankaccount/200415/38290008](/api/v2/bankaccount/200415/38290008)

[curl -i localhost/api/v2/bankaccount/200415/38290008.xml](/api/v2/bankaccount/200415/38290008.xml)

### Return:
```xml
HTTP/1.1 200 OK
Server: nginx
Date: Wed, 27 Sep 2017 12:48:10 GMT
Content-Type: application/xml
Content-Length: 484
Last-Modified: Wed, 27 Sep 2017 12:02:40 GMT
Connection: keep-alive
ETag: "59cb9360-1e4"
Accept-Ranges: bytes

<result>
<sort_code>200415</sort_code>
<account>38290008</account>
<iban>GB37BARC20041538290008</iban>
<country>GB</country>
<bank_name>BARCLAYS BANK PLC</bank_name>
<bank_bic>BARCGB2108L</bank_bic>
<chaps_bic>BARCGB22</chaps_bic>
<bank_address>Dept AC Barclaycard House</bank_address>
<bank_city>Northampton</bank_city>
<bank_postalcode>NN4 7SG</bank_postalcode>
<bank_phone>01604 234234</bank_phone>
<direct_debits>NO</direct_debits>
<pfs_payments>YES</pfs_payments>
<chaps>YES</chaps>
<bacs>YES</bacs>
<ccc_payments>NO</ccc_payments>
</result>
```

### Result Codes
Status code|Result
---|---
200|OK - bank details found
403|Error - forbidden
404|Error - bank details not found