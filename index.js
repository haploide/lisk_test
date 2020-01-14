const {Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk');

configDevnet.app.label = 'hello-world-blockchain-app';

const app = new Application(genesisBlockDevnet, configDevnet);

app
    .run()
    .then(() => app.logger.info('App started...'))
    .catch( error => {
        console.error('Faced error in application', error);
        ProcessingInstruction.exit(1);
    });