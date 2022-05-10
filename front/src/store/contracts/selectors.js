export const getContracts = (store) => store.contracts.list;
export const getContract = store => store.contracts.current;
export const getContractId = store => store.contracts.current.id;
export const getLimitationsList = store => store.contracts.limitations;
export const getTotalLimitations = store => store.contracts.totalLimitations;
export const getExecutiveDoc = store => store.contracts.executiveDoc