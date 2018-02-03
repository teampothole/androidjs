var Mam = require('mam.client.js/lib/mam.node.js');
var IOTA = require('iota.lib.js')
const KV = require('./kv');

const iota = new IOTA({ 'provider': process.env.IRI_URL });
let mamState = Mam.init(iota)
let root = '';
let currentRoot;

const doPublish = (trytes) => {
    return new Promise( (resolve, reject) =>  {
        const message = Mam.create(mamState, trytes);
        if (root == '') {
            root = message.root;
        }
        let roots = {
            root: root, current: message.root
        };

        mamState = message.state
        Mam.attach(message.payload, message.address).then(() => {
            KV(roots).then(kvResp => {
                resolve(message);
            });
        });
    });
};

module.exports = function(payload) {
    var trytes = iota.utils.toTrytes(JSON.stringify(payload));
    const prom =  doPublish(trytes);
    return prom;
}