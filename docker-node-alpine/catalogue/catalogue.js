// Catalog service - catalogue.js
'use strict';

const CATALOG_URI       = 'https://data.bl.uk/catalogue'
const RESOURCE          = 'catalogue'

const express           = require('express');
const app               = express.Router();

const request           = require('request');
//const xml2js            = require('xml2js').parseString;

const xpath             = require('xpath');
const xmldom            = require('xmldom').DOMParser;

const util              = require('util');
const expressValidator  = require('express-validator');
const bodyParser        = require('body-parser');


//
app.use(bodyParser.json());
app.use(expressValidator());


/**
 * Check the service is working
 */
app.get('/', function(req, res) {
  res.json({ service: 'catalogue', status: 'OK' });
});


/**
 *
 */
app.get('/isbn/:isbn', function(req, res) {
  const isbn        = req.params.isbn;
  var   set_number  = '';
  var   set_size    = 0;

  var   ret_http    = HTTPStatus.OK;
  var   ret_status  = 'OK';
  var   ret_error   = '';

  var   res_title;
  var   res_author;
  var   res_pages;

  // Validate the parameters
  req.checkParams('isbn', 'Invalid ISBN').isInt();

  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.status(HTTPStatus.BAD_REQUEST).json({
        service: RESOURCE,
         search: 'ISBN',
           isbn: isbn,
         status: 'ERROR',
          error: 'Invalid ISBN number'
      }).end();
      return;
    }

    // Call the XService
    // Returns XML in body.
    console.log('Catalogue service request:', CATALOG_URI + '/isbn/' + isbn);

    request.get(CATALOG_URI + '/isbn/'+ isbn, function (error, response, body) {
      if (error) {
        return console.log('Error:', error);
      }

      if (response.statusCode !== 200) {
        return console.log('Invalid status code returned: ', response.statusCode);
      }
      console.log(body);

      // Extract the set_number from the search
      const set_doc = new xmldom().parseFromString(body);

      set_number    = getXMLvalue('/find/set_number', set_doc);

      // Set the status code based on the result set
      if (set_number !== undefined && set_number > 0) {
        console.log('Search: ', set_number);
          ret_http   = HTTPStatus.OK;
          ret_status = 'OK';

          // Now get the search result set data
          console.log('Catalogue service request:', CATALOG_URI + '/result/' + isbn);
          request.get(CATALOG_URI + '/result/' + set_number, function (error, response, body) {
          if (error) {
             return console.log('Error:', error);
          }

          if (response.statusCode !== 200) {
             return console.log('Invalid status code returned: ', response.statusCode);
          }
          console.log(body);

          // Extract out the interesting bits from the MARC response
          const res_doc     = new xmldom().parseFromString(body);
                res_title   = getMARCvalue( "245", "a", res_doc);
                res_author  = getMARCvalue( "100", "a", res_doc);
                res_pages   = getMARCvalue( "300", "a", res_doc);

          console.log('Result details: ', res_title, res_author, res_pages);

          // Return HTTP status code and body JSON
          res.status(ret_http).json({
                service: RESOURCE,
                 search: 'ISBN',
                   isbn: isbn,
             set_number: set_number,
               set_size: set_size,
                 status: ret_status,
                 result: {
                     isbn: isbn,
                   author: res_author,
                    title: res_title,
                    pages: res_pages
                  }
          });
        });

      } else {
        ret_http = HTTPStatus.NOT_FOUND;
        ret_status = 'NOT FOUND';
        res.status(ret_http).json({
              service: RESOURCE,
               search: 'ISBN',
                 isbn: isbn,
           set_number: set_number,
             set_size: set_size,
               status: ret_status,
                error: ret_error,
        });
      }
    });
  });
});

module.exports = app;


/**
 * Return the value from MARC XML field number and label
 */
function getMARCvalue( field_num, label, MARCdoc ) {
  if (MARCdoc === undefined) return;

  const node = xpath.select('/present/record/metadata/oai_marc/varfield[@id="' + field_num + '"]/subfield[@label="' + label + '"]', MARCdoc)
  if (node === undefined || node[0].firstChild.data === undefined) return;

  return node[0].firstChild.data;
}

/**
 *
 */
function getXMLvalue( q, doc ) {
  if (doc === undefined) return null;

  const node = xpath.select(q, doc);
  if (node[0] === undefined) return null;
  if (node[0].firstChild.data === undefined) return null;

  return node[0].firstChild.data;
}
