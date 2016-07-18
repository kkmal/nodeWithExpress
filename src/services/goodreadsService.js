'use strict';

const http = require('http');
const xml2js = require('xml2js');
const parser = xml2js.Parser({ explicitArray: false });

module.exports = () => {
  const getBookById = (id, cb) => {
    const options = {
      host: 'www.goodreads.com',
      path: '/book/show/656?format=xml&key=EJwEpKX64oGl0obzmdYw',
    };
    const callback = (response) => {
      let str = '';

      response.on('data', (chunk) => { str += chunk; });
      response.on('end', () => {
        parser.parseString(str, (err, result) => {
          cb(null, result.GoodreadsResponse.book);
        });
      });
    };

    http.request(options, callback).end();
  };

  return {
    getBookById,
  };
};
