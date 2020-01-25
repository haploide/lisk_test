const HelloTransaction = require('../hello_transaction');
const transactions = require('@liskhq/lisk-transactions');
const { EPOCH_TIME } = require('@liskhq/lisk-constants');

const getTimestamp = () => {
    const millisSinceEpoc = Date.now() - Date.parse(EPOCH_TIME);
    const inSeconds = ((millisSinceEpoc) / 1000).toFixed(0);
    return parseInt(inSeconds);
}

let tx = new HelloTransaction({
    asset: {
        hello: 'world'
    },
    fee: `${transactions.utils.convertLSKtoBeddows('1')}`,
    recipientId: '10881167371402274308L',
    timestamp: getTimestamp()
});

tx.sing('wagon stock borrow episode laundry kitten salute link globe zero feed marble');

console.log(tx.stringify());
ProcessingInstruction.exit(0);