const Contract = require("./Contract");
const CourtOrder = require("./CourtOrder");
const CancelDecision = require("./CancelDecision");
const ReceivingOrder = require("./ReceivingOrder");
const IPInit = require("./IPInit");
const IPEnd = require("./IPEnd");

const fileFactory = {
    contract: Contract,
    courtOrder: CourtOrder,
    cancelDecision: CancelDecision,
    receivingOrder: ReceivingOrder,
    IPInit: IPInit,
    IPEnd: IPEnd
}

module.exports = fileFactory;