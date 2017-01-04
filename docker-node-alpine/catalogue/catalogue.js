// Catalog service - catalogue.js
'use strict';

const CATALOG_URI       = 'https://data.bl.uk/catalogue/isbn/'
const RESOURCE          = 'catalogue'

const express           = require('express');
const app               = express.Router();

const request           = require('request');
const xml2js            = require('xml2js').parseString;

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
  var   set_number  = 0;
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
      });
      return;
    }

    // Call the XService
    // Returns XML in body.
    console.log('Catalogue service request:', CATALOG_URI + isbn);

    request.get(CATALOG_URI + isbn, function (error, response, body) {
      if (error) {
        return console.log('Error:', error);
      }

      if (response.statusCode !== 200) {
        return console.log('Invalid status code returned: ', response.statusCode);
      }
      console.log(body);

      // Convert the XML into JSON
      xml2js(body, function(error, result) {
        if (error) {
          return console.log(error);
        }
        console.log(result)

        // Was there anything found?
        if (result.find.error !== undefined && result.find.error[0] === 'empty set') {
          console.log('ISBN not found:', isbn );
          res.status(HTTPStatus.NOT_FOUND).json({
            service: RESOURCE,
             search: 'ISBN',
               isbn: isbn,
             status: 'NOT FOUND'
          });
          return;
console.warn('never here!');
        }

        // Get the set_number and number of matching records from the search
        if (result.find.set_number !== undefined) {
          set_number = result.find.set_number[0];
        }

        if (result.find.no_records !== undefined) {
          set_size = result.find.no_records[0];
        }

        console.log('set_number: ', set_number);
        console.log('set_size: ', set_size);

      });

      // Get the result of the search
      if (set_number > 0) {
        console.log('Search: ', set_number);

        res.status(HTTPStatus.OK).send('OK');
      } else {
        res.status(HTTPStatus.NOT_FOUND).send('NOTFOUND');
      }

//      res.json({ search: isbn, status: 'OK' });
    });
  });
});

module.exports = app;
