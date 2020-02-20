const { BaseTransaction, TransactionError } = require('@liskhq/lisk-transactions');

class HelloTransaction extends BaseTransaction {

    static get TYPE() {
        return 10;
    }

    static get FEE() {
        return `${10 ** 8}`;
    }

    async prepare(store) {
        await store.account.cache([
            {
                address: this.senderId
            }
        ]);
    }

    validateAsset() {
        const errors = [];
        if (!this.asset.fingerprint || typeof this.asset.fingerprint !== 'string') {
            errors.push(
                new TransactionError(
                    'Invalid "asset.fingerprint" defined on transaction',
                    this.id,
                    '.asset.fingerprint',
                    this.asset.hello,
                    'A string value no longer than 64 characters'
                )
            );
        }
        return errors;
    }

    applyAsset(store) {
        const errors = [];
        const sender = store.account.get(this.senderId);

        if (!sender.asset.apostilled_files_count) {
            sender.asset.apostilled_files_count = 0;
        }

        if (!sender.asset.apostilled_files) {
            sender.asset.apostilled_files = [];
        }

        sender.asset.apostilled_files_count++;

        sender.asset.apostilled_files.push(this.asset);

        store.account.set(sender.address, sender);

        //todo: agregar validaciones

        const updatedSender = { ...sender, asset: {             
            apostilled_files_count: sender.asset.apostilled_files_count,
            apostilled_files: sender.asset.apostilled_files
         } };
        store.account.set(sender.address, updatedSender);
        
        return errors;
    }

    undoAsset(store) {
        const sender = store.account.get(this.senderId);
        const oldObj = { ...sender, asset: null };
        store.account.set(sender.address, oldObj);
        return [];
    }


}

module.exports = HelloTransaction;
