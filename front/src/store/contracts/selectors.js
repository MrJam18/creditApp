import { selectorCreator } from "../base/selectorCreator";
import {SelectExisting} from "../../classes/SelectExisting";
const base = selectorCreator('contracts');

export const getContracts = (store) => store.contracts.list;
export const getContract = store => store.contracts.current;
export const getContractId = store => store.contracts.current.id;
export const getLimitationsList = store => store.contracts.limitations;
export const getTotalLimitations = store => store.contracts.totalLimitations;
export const getExecutiveDoc = store => store.contracts.executiveDoc;
export const getContractStatuses = base('statuses');
export const selectExisting = new SelectExisting();
selectExisting.getSelector('contract');
selectExisting.getSelector('cancelDecision');
selectExisting.getSelector('courtOrder');
selectExisting.getSelector('IPEnd');
selectExisting.getSelector('IPInit');
selectExisting.getSelector('receivingOrder');
export const selectLoadingExisting = (store) => store.contracts.loadingExisting;
