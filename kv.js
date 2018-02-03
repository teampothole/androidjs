const  request = require('request');
const kvUrl = process.env.KV_URL;
//const kvUrl = 'https://api.keyvalue.xyz/96a61ef1/potholeID';

module.exports = function(payload) {
    console.dir(payload);
    return new Promise( (resolve, reject) => {
        request.post({ url: kvUrl, body: payload, json:true}, function (error, response, body) {
            resolve(response);
          });
    })
}

//module.exports({david: 'lobato'});

