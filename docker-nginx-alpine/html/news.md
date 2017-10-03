[home](/home)

***3 Oct 2017*** - v2.1 released

- Updates to `/api/v1` and `/api/v2` to remove JSON responses from the `/bankaccount` service. See [v2.1 release notes](/docs/releasenotes/v2.1)
  - `/api/v1/bankaccount/200415.json` removed. Future access will result in `404 Not Found` responses.
  - `/api/v1/bankaccount/200415/38290008.json` removed. Future access will result in `404 Not Found` responses.
  - `/api/v2/bankaccount/200415.json` removed. Future access will result in `404 Not Found` responses.
  - `/api/v2/bankaccount/200415/38290008.json` removed. Future access will result in `404 Not Found` responses.
- Update to `/api/v2` of `/bankaccount` to return a of `content-type text/xml` to better replicate an internal live legacy system's behaviour 

**The API endpoints have not been changed.  No other changes have been made to the other API's**

> The `/bankaccount` API was intended to replicate legacy API's that are used within the British Library, and to simulate the similar functional requirements and behaviours. In order to ensure that the vendor submissions can support this style of interface, the JSON endpoint has been withdrawn.
> The `.json` feature was included to `/api/v2` in error and apologies for any confusion this incurred.

***27 Sept 2017*** - v2 released

New version 2 of the `/api` available to support correct `content-type` headers for XML and JSON content. See [v2 release notes](/docs/releasenotes/v2)

All the previous `/api/v1` resources remain unaltered and are still available to be used. See [v1 documentation](/api/index.html)

See [release notes](/docs/releasenotes) for more details

