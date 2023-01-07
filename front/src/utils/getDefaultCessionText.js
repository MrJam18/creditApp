import {changeDateFormatOnRus} from "./changeDateFormat";

export const getDefaultCessionText = (number, transferDate, assignee, assignor) => {
    return `${transferDate ? changeDateFormatOnRus(transferDate) : '??.??.????'} г. ${assignor.short} и ${assignee.short} заключили договор цессии ${number ? '№ ' + number : 'б/н'}, согласно которому ${assignor.short} передало право требования задолженности по настоящему договору займа ${assignee.short} в полном объеме.`;
}