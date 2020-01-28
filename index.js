const {Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk');
const HelloTransaction = require('./hello_transaction');

configDevnet.app.label = 'hello-world-blockchain-app';
configDevnet.modules.http_api.access.public = true;

const app = new Application(genesisBlockDevnet, configDevnet);
app.registerTransaction(HelloTransaction);

app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch( error => {
        console.error('Faced error in application', error);
        ProcessingInstruction.exit(1);
    });