const { countFeeOrder } = require("../../utils/countMoney/countFee");
const compareDatesBool = require("../../utils/dates/compareDatesBool");
const { Indent } = require("./docxClasses");

module.exports = function(result, sumIssue, dateIssue) {
    let text;
    let percents = result.percents;
    let main = sumIssue;
    let penalties = result.penalties;
    if(compareDatesBool(dateIssue, '2016-03-28') && compareDatesBool('2016-12-31', dateIssue)){
        if (percents > result.main * 4) percents = result.main * 4;
        text = [ 
            new Indent('Однако, согласно Федеральному закону от 02.07.2010 N 151-ФЗ (ред. от ред. от 29.12.2015 г.) "О микрофинансовой деятельности и микрофинансовых организациях" МФО имеет право начислять проценты до достижения общей суммы подлежащих уплате процентов размера, составляющего четырехкратную сумму непогашенной части займа.'),
            new Indent(`Следовательно, сумма процентов составляет ${percents} руб.`) 
        ]
    }
    else if(compareDatesBool(dateIssue, '2016-12-31') && compareDatesBool('2019-01-27', dateIssue)){
        if (percents > result.main * 3) percents = result.main * 3;
        percents = result.payments.reduce((acc, el)=> {
            acc -= el.sum;
            if (acc < 0)  {
                main = el.sum - acc;
                acc = 0;
            }
            if (main < 0 ){
                penalties += main;
                main = 0; 
            }
            return acc; 
        }, percents)
        if (percents > main * 2) percents = main * 2;
        text = [ 
            new Indent('Однако, согласно Федеральному закону от 02.07.2010 N 151-ФЗ (ред. от 03.07.2016) "О микрофинансовой деятельности и микрофинансовых организациях" МФО имеет право начислять проценты до достижения общей суммы подлежащих уплате процентов размера, составляющего двухкратную сумму непогашенной части займа, а общий размер процентов не может превышать трехкратного размера от суммы займа.'),
            new Indent(`Следовательно, сумма процентов составляет ${percents} руб.`) 
        ]
    }
    else if(compareDatesBool(dateIssue, '2019-01-27') && compareDatesBool('2019-06-30', dateIssue)) {
        if (percents > (result.main * 2.5 - penalties)) percents = sumIssue * 2.5 - penalties;
        percents = result.payments.reduce((acc, el)=> {
            acc -= el.sum;
            if (acc < 0)  {
                main = el.sum - acc;
                acc = 0;
            }
            if (main < 0 ){
                penalties += main;
                main = 0; 
            }
            return acc; 
        }, percents)
        text = [ 
            new Indent('Однако, согласно Федеральному закону от 27.12.2018 N 554-ФЗ "О внесении изменений в Федеральный закон "О потребительском кредите (займе)" и Федеральный закон "О микрофинансовой деятельности и микрофинансовых организациях" по договору потребительского кредита(займа) не допускается начисление процентов, неустойки (штрафа, пени), иных мер ответственности по договору потребительского кредита (займа), а также платежей за услуги, оказываемые кредитором заемщику за отдельную плату по договору потребительского кредита (займа), после того, как сумма начисленных процентов, неустойки (штрафа, пени), иных мер ответственности по договору потребительского кредита (займа), а также платежей за услуги, оказываемые кредитором заемщику за отдельную плату по договору потребительского кредита (займа) (далее - фиксируемая сумма платежей), достигнет двух с половиной кратного размера суммы предоставленного потребительского кредита (займа).'),
            new Indent(`Следовательно, сумма процентов составляет ${percents} руб.`) 
        ]
    }
    else if(compareDatesBool(dateIssue, '2019-30-06') && compareDatesBool('2019-12-31', dateIssue)){
        if (percents > (result.main * 2 - penalties)) percents = sumIssue * 2 - penalties;
        percents = result.payments.reduce((acc, el)=> {
            acc -= el.sum;
            if (acc < 0)  {
                main = el.sum - acc;
                acc = 0;
            }
            if (main < 0 ){
                penalties += main;
                main = 0; 
            }
            return acc; 
        }, percents)
        text = [ 
            new Indent('Однако, согласно Федеральному закону от 27.12.2018 N 554-ФЗ "О внесении изменений в Федеральный закон "О потребительском кредите (займе)" и Федеральный закон "О микрофинансовой деятельности и микрофинансовых организациях" по договору потребительского кредита(займа) не допускается начисление процентов, неустойки (штрафа, пени), иных мер ответственности по договору потребительского кредита (займа), а также платежей за услуги, оказываемые кредитором заемщику за отдельную плату по договору потребительского кредита (займа), после того, как сумма начисленных процентов, неустойки (штрафа, пени), иных мер ответственности по договору потребительского кредита (займа), а также платежей за услуги, оказываемые кредитором заемщику за отдельную плату по договору потребительского кредита (займа) (далее - фиксируемая сумма платежей), достигнет двухкратного размера суммы предоставленного потребительского кредита (займа).'),
            new Indent(`Следовательно, сумма процентов составляет ${percents} руб.`) 
        ]
    }
    else if(compareDatesBool(dateIssue, '2019-12-31')){
        if (percents > (result.main * 1.5 - penalties)) percents = sumIssue * 1.5 - penalties;
        percents = result.payments.reduce((acc, el)=> {
            acc -= el.sum;
            if (acc < 0)  {
                main = el.sum - acc;
                acc = 0;
            }
            if (main < 0 ){
                penalties += main;
                main = 0; 
            }
            return acc; 
        }, percents)
        text = [ 
            new Indent('Однако, согласно Федеральному закону от 27.12.2018 N 554-ФЗ "О внесении изменений в Федеральный закон "О потребительском кредите (займе)" и Федеральный закон "О микрофинансовой деятельности и микрофинансовых организациях" по договору потребительского кредита(займа) не допускается начисление процентов, неустойки (штрафа, пени), иных мер ответственности по договору потребительского кредита (займа), а также платежей за услуги, оказываемые кредитором заемщику за отдельную плату по договору потребительского кредита (займа), после того, как сумма начисленных процентов, неустойки (штрафа, пени), иных мер ответственности по договору потребительского кредита (займа), а также платежей за услуги, оказываемые кредитором заемщику за отдельную плату по договору потребительского кредита (займа) (далее - фиксируемая сумма платежей), достигнет полуторакратного размера суммы предоставленного потребительского кредита (займа).'),
            new Indent(`Следовательно, сумма процентов составляет ${percents} руб.`) 
        ]
    }
    else {
        main = result.main;
    }
    const sum = Number(main + percents + penalties).toFixed(2);
    const fee = countFeeOrder(sum);
    return {
        text, percents, penalties, main, sum, fee
    }
}