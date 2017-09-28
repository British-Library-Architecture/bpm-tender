[home](/home) | [postcode](/docs/api/v2/postcode)

## Find UK Address from Postcode

Service endpoint: [http://www.bl.uk/Api/PostcodeService.svc](http://www.bl.uk/Api/PostcodeService.svc)

WSDL: [http://www.bl.uk/Api/PostcodeService.svc?wsdl](http://www.bl.uk/Api/PostcodeService.svc?wsdl)

Return a GB address for a given `postcode`

Method|Parameter|Type|Requirements
---|---|---|---
FindUkAddressesFromPostCode|p_PostCode|String|8 chars

Note: The space between the outbound and inbound portions of the postcode is optional.


### Example: Find single UK address from postcode

Request:
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:FindUkAddressesFromPostCode>
         <!--Optional:-->
         <tem:p_PostCode>LS23 7BQ</tem:p_PostCode>
      </tem:FindUkAddressesFromPostCode>
   </soapenv:Body>
</soapenv:Envelope>
```

Response:
```xml
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
   <s:Body>
      <FindUkAddressesFromPostCodeResponse xmlns="http://tempuri.org/">
         <FindUkAddressesFromPostCodeResult xmlns:a="http://schemas.datacontract.org/2004/07/Domain" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <a:Address>
               <a:AddressId>0</a:AddressId>
               <a:AddressLine1>British Library</a:AddressLine1>
               <a:AddressLine2>Boston Spa</a:AddressLine2>
               <a:AddressLine3/>
               <a:AddressType>0</a:AddressType>
               <a:Country/>
               <a:CountryISO>GBR</a:CountryISO>
               <a:CountryId>227</a:CountryId>
               <a:CountyState>West Yorkshire</a:CountyState>
               <a:Department/>
               <a:PostCode>LS23 7BQ</a:PostCode>
               <a:PreferredContact>false</a:PreferredContact>
               <a:PreferredDelivery>false</a:PreferredDelivery>
               <a:ProvinceRegion/>
               <a:ReadOnly>false</a:ReadOnly>
               <a:TownCity>Wetherby</a:TownCity>
            </a:Address>
         </FindUkAddressesFromPostCodeResult>
      </FindUkAddressesFromPostCodeResponse>
   </s:Body>
</s:Envelope>
```

### Example: Matching multiple addresses

Request:
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:FindUkAddressesFromPostCode>
         <!--Optional:-->
         <tem:p_PostCode>YO30 5NH</tem:p_PostCode>
      </tem:FindUkAddressesFromPostCode>
   </soapenv:Body>
</soapenv:Envelope>
```

Response:
```xml
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
   <s:Body>
      <FindUkAddressesFromPostCodeResponse xmlns="http://tempuri.org/">
         <FindUkAddressesFromPostCodeResult xmlns:a="http://schemas.datacontract.org/2004/07/Domain" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <a:Address>
               <a:AddressId>0</a:AddressId>
               <a:AddressLine1>1 Coningham Avenue</a:AddressLine1>
               <a:AddressLine2/>
               <a:AddressLine3/>
               <a:AddressType>0</a:AddressType>
               <a:Country/>
               <a:CountryISO>GBR</a:CountryISO>
               <a:CountryId>227</a:CountryId>
               <a:CountyState>North Yorkshire</a:CountyState>
               <a:Department/>
               <a:PostCode>YO30 5NH</a:PostCode>
               <a:PreferredContact>false</a:PreferredContact>
               <a:PreferredDelivery>false</a:PreferredDelivery>
               <a:ProvinceRegion/>
               <a:ReadOnly>false</a:ReadOnly>
               <a:TownCity>York</a:TownCity>
            </a:Address>
            <a:Address>
               <a:AddressId>0</a:AddressId>
               <a:AddressLine1>2 Coningham Avenue</a:AddressLine1>
               <a:AddressLine2/>
               <a:AddressLine3/>
               <a:AddressType>0</a:AddressType>
               <a:Country/>
               <a:CountryISO>GBR</a:CountryISO>
               <a:CountryId>227</a:CountryId>
               <a:CountyState>North Yorkshire</a:CountyState>
               <a:Department/>
               <a:PostCode>YO30 5NH</a:PostCode>
               <a:PreferredContact>false</a:PreferredContact>
               <a:PreferredDelivery>false</a:PreferredDelivery>
               <a:ProvinceRegion/>
               <a:ReadOnly>false</a:ReadOnly>
               <a:TownCity>York</a:TownCity>
            </a:Address>

            <snip>a:Address repeated for each property</snip>

            <a:Address>
               <a:AddressId>0</a:AddressId>
               <a:AddressLine1>Amelia House</a:AddressLine1>
               <a:AddressLine2>Coningham Avenue</a:AddressLine2>
               <a:AddressLine3/>
               <a:AddressType>0</a:AddressType>
               <a:Country/>
               <a:CountryISO>GBR</a:CountryISO>
               <a:CountryId>227</a:CountryId>
               <a:CountyState>North Yorkshire</a:CountyState>
               <a:Department/>
               <a:PostCode>YO30 5NH</a:PostCode>
               <a:PreferredContact>false</a:PreferredContact>
               <a:PreferredDelivery>false</a:PreferredDelivery>
               <a:ProvinceRegion/>
               <a:ReadOnly>false</a:ReadOnly>
               <a:TownCity>York</a:TownCity>
            </a:Address>
         </FindUkAddressesFromPostCodeResult>
      </FindUkAddressesFromPostCodeResponse>
   </s:Body>
</s:Envelope>
```

### Example: Invalid postcode or matching addresses
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
   <soapenv:Header/>
   <soapenv:Body>
      <tem:FindUkAddressesFromPostCode>
         <!--Optional:-->
         <tem:p_PostCode>XXYYZZ</tem:p_PostCode>
      </tem:FindUkAddressesFromPostCode>
   </soapenv:Body>
</soapenv:Envelope>
```

Response:
```xml
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
   <s:Body>
      <FindUkAddressesFromPostCodeResponse xmlns="http://tempuri.org/">
         <FindUkAddressesFromPostCodeResult xmlns:a="http://schemas.datacontract.org/2004/07/Domain" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"/>
      </FindUkAddressesFromPostCodeResponse>
   </s:Body>
</s:Envelope>
```

### Result Codes
Status code|Result
---|---
200|OK - Response 
500 or timeout|Error - Postcode service failure. Not available
