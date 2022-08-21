const {
    Head,
    Header,
    Indent,
    Text,
    HeaderWithoutBreaks,
    BoldWithTopBreak,
    Signature
} = require("../../services/documentsService/docxClasses");
const CourtClaim = require("./CourtClaim");


module.exports = class Claim extends CourtClaim
{
    constructor(contractId)
    {
        super(11, contractId);

    }

    _buildContent() {
        return this.content = {
            children: [
                new Head(`В ${this.court.name}`),
                new Head('Адрес:'),
                new Head(this.court.fullAddress),
                new Head("Истец:"),
                new Head(this.creditor.name),
                new Head('Адрес:'),
                new Head(this.creditor.fullAddress),
                new Head(`ИНН ${this.creditor.INN}, КПП ${this.creditor.KPP}`),
                new Head(`Банковские реквизиты:`),
                new Head(`${this.creditor.requisits}`),
                new Head('Представитель:'),
                new Head(this.agent.fullName),
                new Head('Адрес:'),
                new Head(this.agent.fullAddress),
                new Head('Ответчик:'),
                new Head(this.debtor.fullName),
                new Head('Адрес:'),
                new Head(this.debtor.fullAddress),
                new Head(`Дата рождения: ${this.debtor.birth_date} г.`),
                new Head('Место рождения:'),
                new Head(this.debtor.birth_place),
                this.debtor.passport ? new Head(`Паспорт: Серия ${this.debtor.passport.series} № ${this.debtor.passport.number}`) : new Head('Паспорт: данные неизвестны'),
                new Head(`Цена иска: ${this.result.sum} руб.`),
                new Head(`Госпошлина: ${this.result.fee} руб.`),
                new Header('Исковое заявление о взыскании задолженности.'),
                new Indent(`${this.contract.date_issue} г. ${this.firstCreditor} (далее - "Заимодавец") и ${this.debtor.fullName} (далее - "Ответчик") заключили договор займа № ${this.contract.number} (далее - "Договор"). В соответствии с условиями договора заимодавец передал ответчику денежную сумму в размере ${this.contract.sum_issue} рублей сроком на ${this.result.daysCase.days} ${this.result.daysCase.daysCase}, а ответчик обязался возвратить такую же сумму денег и уплатить проценты в размере ${this.contract.percent} % годовых от суммы займа.
            `),
                new Indent(`${this.contract.date_issue} г. ответчик денежную сумму по договору получил, что подтверждается расходным кассовым ордером.`),
                new Indent(`До настоящего времени сумма займа не оплачена. Этим ответчик нарушил обязанность возвратить сумму займа до ${this.contract.due_date} г., предусмотренную условиями договора.`),
                new Indent(`Также, согласно условиям договора “за неисполнение или ненадлежащее исполнение заемщиком обязательства по возврату займа и уплате процентов на сумму займа начисляется неустойка в размере ${this.contract.penalty} % процентов годовых от суммы неисполненного обязательства за каждый день просрочки с даты, следующей за датой наступления исполнения обязательства, установленной договором займа, по дату погашения просроченной задолженности`),
                new Indent(`Так, по п.1 ст. 330 ГК РФ "Неустойкой (штрафом, пеней) признается определенная законом или договором денежная сумма, которую должник обязан уплатить кредитору в случае неисполнения или ненадлежащего исполнения обязательства, в частности в случае просрочки исполнения. По требованию об уплате неустойки кредитор не обязан доказывать причинение ему убытков."`),
                new Indent(`На ${this.countDate} г. сумма задолженности по договору${!this.result.ignorePayments ? ', с учетом ограничений размера процентов и неустойки, установленных Федеральным законом от 27.12.2018 г. № 554-ФЗ и ст. 12.1 Федерального закона от 02.07.2010 N 151-ФЗ,' : ''} составляет:`),
                new Indent(`основной долг: ${this.result.main} руб.`),
                new Indent(`Проценты по договору: ${this.result.percents} руб.`),
                new Indent(`неустойка по договору: ${this.result.penalties} руб.`),
                ...this.limitedText.list,
                new Indent(`В соответствии со ст. 309 ГК РФ, обязательства должны исполняться надлежащим образом в соответствии с условиями обязательства, односторонний отказ от исполнения обязательства не допускается (ст.310 ГК РФ), исполнение обязательства должно производится в сроки, установленные договором (ст. 314 ГК РФ).`),
                new Indent(`Согласно ст. 807 ГК РФ по договору займа одна сторона (займодавец) передает в собственность другой стороне (заемщику) деньги или другие вещи, определенные родовыми признаками, а заемщик обязуется возвратить займодавцу такую же сумму денег (сумму займа) или равное количество других полученных им вещей того же рода и качества. Договор займа считается заключенным с момента передачи денег или других вещей.`),
                new Indent(`Статья 810 ГК РФ предусматривает, что заемщик обязан возвратить займодавцу полученную сумму займа в срок и в порядке, которые предусмотрены договором займа.`),
                new Indent(`В соответствии со ст. 809 ГК РФ:`),
                new Text(`"1. Если иное не предусмотрено законом или договором займа, займодавец имеет право на получение с заемщика процентов на сумму займа в размерах и в порядке, определенных договором.`),
                new Text(`2. При отсутствии иного соглашения проценты выплачиваются ежемесячно до дня возврата суммы займа»."`),
                this.contract.isContractJur && new Indent(`В соответствии с п. 1.17 Договора займа спор подлежит рассмотрению в суде: ${this.court.name}.`),
                ...this.cessionIndents.list,
                new Indent(`На основании изложенного, руководствуясь ст.121-123 ГПК РФ,`),
                new HeaderWithoutBreaks(`Прошу:`),
                new Text(`1.  Взыскать с ${this.debtor.genitive} в пользу ${this.creditor.name} задолженность на ${this.countDate} г. по договору займа № ${this.contract.number} от ${this.contract.date_issue} г. в сумме ${this.result.sum} руб., в том числе:`),
                new Text(`1.1.  Основной долг в размере ${this.result.main} руб.`),
                new Text(`1.2.  Проценты за пользование займом в размере ${this.result.limited.sum} руб.`),
                new Text(`1.3.  Неустойка за просрочку исполнения обязательств в размере ${this.result.penalties} руб.`),
                new Text(`2.  Взыскать с ${this.debtor.genitive} в пользу ${this.creditor.name} расходы по уплате государственной пошлины в размере ${this.result.fee} руб.`),
                new BoldWithTopBreak('Приложение:'),
                new Text('- Квитанция об оплате госпошлины;'),
                new Text(`- Расчет исковых требований;`),
                new Text(`- Договор займа № ${this.contract.number} от ${this.contract.date_issue} г.;`),
                new Text(`- Расходный кассовый ордер;`),
                ...this.enclosures.list,
                new Signature(this.agent.initials)
            ]
        }
    }
    getPath()
    {
        return `/${this.contractId}/documents/claims`;
    }
}