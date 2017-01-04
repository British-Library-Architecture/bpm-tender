'use strict'

const api = require('express')
const https = require('https');
const xml2json = require('xml2json');

const Resource = function() {
    var api = express.Router();
    api.get('/catalogue', (req, res, next) => {
        https.get({
                host: 'data.bl.uk',
             //   port: '',
                path: '/catalogue/isbn/9780747599876'
            },
            (response) => {
                let body = '';
                response.on('data', (d) => {
                    body += d;
                });
                response.on('end', () => {
              //      const parsed = JSON.parse(body);
              //      res.json(parsed);
		    res = body;	
                    next();
                });
            });
    });
    return api;
}

module.exports = Resource;
