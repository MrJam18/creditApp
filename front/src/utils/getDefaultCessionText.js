import {changeDateFormatOnRus} from "./changeDateFormat";

export const getDefaultCessionText = (number, transferDate, assignee, assignor) => {
    return `${transferDate ? changeDateFormatOnRus(transferDate) : '??.??.????'} г. Между ${assignee.short} и ${assignor.short} был заключен договор цессии ${number ? '№ ' + number : 'б/н'}, согласно которому ${assignee.short} передало право требования задолженности по настоящему договору займа ${assignor.short} в полном объеме.`;
}