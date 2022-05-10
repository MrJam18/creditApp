import React from 'react';
import styles from '../../css/start.module.css'

const Referrences = () => {
    return (
        <div className={styles.element}>
            <div className="header">Полезные ссылки.</div>
            <a href="https://dogovor-urist.ru/calculator/dogovor_zayma/" target='_blank' className={styles.refference}>Удобный калькулятор расчета процентов</a>
            <a href="https://dogovor-urist.ru/calculator/dogovor_zayma/" target='_blank' className={styles.refference}>Удобный калькулятор расчета неустойки</a>
            <a href="https://vsrf.ru/lk/calculator/list" target='_blank' className={styles.refference}>Калькулятор государственной пошлины</a>
            <a href="http://www.consultant.ru/document/cons_doc_LAW_39570/" target='_blank' className={styles.refference}>Гражданско-процессуальный кодекс РФ</a>
            <a href="http://www.consultant.ru/document/cons_doc_LAW_5142/" target='_blank' className={styles.refference}>Гражданский кодекс РФ</a>
            <a href="http://www.consultant.ru/document/cons_doc_LAW_209705/" target='_blank' className={styles.refference}>Постановление Пленума ВС РФ "О приказном производстве</a>
            <a href="http://lenmir6.udm.msudrf.ru/modules.php?name=info_pages&rid=8" target='_blank' className={styles.refference}>суд. участок №6 ленинского района г. Ижевска</a>
            <a href="https://leninskiy--udm.sudrf.ru/modules.php?name=sud_delo&srv_num=2" target='_blank' className={styles.refference}>Ленинский районный суд г. Ижевска</a>
        </div>
    );
};

export default Referrences;