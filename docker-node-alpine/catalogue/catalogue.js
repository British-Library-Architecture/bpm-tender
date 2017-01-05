// Catalog service - catalogue.js
'use strict';

const CATALOG_URI       = 'https://data.bl.uk/catalogue'
const RESOURCE          = 'catalogue'

const express           = require('express');
const app               = express.Router();

const request           = require('request');

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
 * Search the catalogue XService based on an ISBN number
 * Return:
 *   Success: HTTP 200 + JSON object
 * Not found: HTTP 404 + JSON object
 *
 * TODO  - Refactor code to nodejs best practices (modularise, promises etc)
 * FIXME - Loads of potential ASYNC edge-case race conditions
 */
app.get('/isbn/:isbn', function(req, res) {
  const isbn        = req.params.isbn;
  var   set_number  = '';
  var   set_size    = 0;

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

      // Result found. Extract and export JSON result
      if (set_number !== undefined && set_number > 0) {
        console.log('Search: ', set_number);

        // Now get the search result set data
        console.log('Catalogue service request:', CATALOG_URI + '/result/' + isbn);
        request.get(CATALOG_URI + '/result/' + set_number, function (error, response, body) {
          if (error) {
            console.log('Error:', error);
            return res.status(HTTPStatus.FAILED_DEPENDENCY).end();
          }

          if (response.statusCode !== 200) {
            console.log('Invalid status code returned: ', response.statusCode);
            return res.status(response.statusCode).end();
          }
          console.log(body);

          // Extract out the interesting bits from the MARC response
          const res_doc     = new xmldom().parseFromString(body);

          // Return HTTP status code and body JSON
          res.status(HTTPStatus.OK).json({
                service: RESOURCE,
                 search: 'ISBN',
                   isbn: isbn,
             set_number: set_number,
               set_size: set_size,
                 status: 'OK',
                 result: {
                     isbn: isbn,
                   author: getMARCvalue( "100", "a", res_doc),
                    title: getMARCvalue( "245", "a", res_doc),
                   format: getMARCvalue( "300", "a", res_doc) + ' ' + getMARCvalue( "300", "b", res_doc) + ' ' + getMARCvalue( "300", "c", res_doc),
                publisher: getMARCvalue( "264", "a", res_doc) + ' ' + getMARCvalue( "264", "b", res_doc) + ' ' + getMARCvalue( "264", "c", res_doc)
                }
          });
        });

      } else {
        // No matching result 
        res.status(HTTPStatus.NOT_FOUND).json({
              service: RESOURCE,
               search: 'ISBN',
                 isbn: isbn,
           set_number: set_number,
             set_size: set_size,
               status: 'NOT FOUND',
                error: 'No matching titles',
        });
      }
    });
  });
});

//
module.exports = app;



// Helper functions

/**
 * Return the value from MARC XML field number and label
 */
function getMARCvalue( field_num, label, MARCdoc ) {
  if (MARCdoc === undefined) return;

  const node = xpath.select('/present/record/metadata/oai_marc/varfield[@id="' + field_num + '"]/subfield[@label="' + label + '"]', MARCdoc)
  if (node === undefined || node[0] === undefined || node[0].firstChild.data === undefined) return;

  return node[0].firstChild.data;
}

/**
 * Get a node value from an XML XPATH query (safely?)
 */
function getXMLvalue( q, doc ) {
  if (doc === undefined) return null;

  const node = xpath.select(q, doc);

  // FIXME - must be a better way to do this...
  if (node[0] === undefined) return null;
  if (node[0].firstChild === undefined) return null;
  if (node[0].firstChild.data === undefined) return null;

  return node[0].firstChild.data;
}
