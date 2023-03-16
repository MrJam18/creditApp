export class SelectExisting {
    getSelector(data)
    {
        this[data] = (store) => store.contracts.existingFiles[data].status;
        this['loading' + data] = (store) => store.contracts.existingFiles[data].loading;
    }
}