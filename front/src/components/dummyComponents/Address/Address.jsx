import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import styles from '../../../css/adress.module.css'
import { useState } from 'react';
import {useShow} from "../../../hooks/useShow";
import AddressManually from "./AddressManually";
import {daDataToken} from "../../../constants/daDataToken";
import addressManuallyIMG from '../../../img/address-manually.svg';

const Address = ({setAdressForDB, defaultValue = '', showHeader = true}) => {
    const [error, setError] = useState(false);
    const showAddressManually = useShow();
    const  onSelectAddress = (val) => {
        const data = val.data;
        setError(false);
        try {
            if (data.house === null) throw new Error('Введите полный адрес до дома!');
            setAdressForDB({
                country: data.country,
                region: data.region,
                region_type: data.region_type_full,
                region_type_short: data.region_type,
                area: data.area_with_type,
                city: data.city || data.settlement,
                city_type: data.city_type_full || data.settlement_type_full,
                city_type_short: data.city_type || data.settlement_type,
                street: data.street ? data.street : data.settlement,
                street_type: data.street_type_full ? data.street_type_full : data.settlement_type_full,
                street_type_short: data.street_type ? data.street_type : data.settlement_type,
                house: data.house,
                house_type: data.house_type_full,
                house_type_short: data.house_type,
                flat: data.flat,
                flat_type: data.flat_type_full,
                flat_type_short: data.flat_type,
                block: data.block,
                block_type: data.block_type_full,
                block_type_short: data.block_type
            })
        } catch (e) {
            console.dir(e);
            setError(e.message);
        }
    }

    return (
        <div className={styles.main}>
            {showHeader && <div className={styles.header}>Адрес</div> }
           Введите адрес и выберите из списка.
            <div className={styles.inputBlock}>
                <div className={styles.inputContainer}>
            <AddressSuggestions selectOnBlur defaultQuery={defaultValue} token={daDataToken} delay={350} onChange= { onSelectAddress} inputProps = {{
                placeholder: 'Введите адрес',
            }}/>
                </div>
                <button onClick={showAddressManually.setTrue} type={"button"} title={'Адрес вручную'} className={styles.handleAddressButton}>
                    <img src={addressManuallyIMG} className={styles.handleAddressIMG} alt="Добавить адрес вручную"/>
                </button>
            </div>
            {error && <div className={styles.error}>{error}</div> }
            {showAddressManually.state && <AddressManually setShowFalse={showAddressManually.setFalse} />}
        </div>
    );
};

export default Address;