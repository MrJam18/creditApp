import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import styles from '../css/adress.module.css'
import { useState } from 'react';

const Address = ({setAdressForDB, defaultValue = '', showHeader = true}) => {
    const [error, setError] = useState(false);
    const  onSelectAdress = (val) => {
        const data = val.data;
        setError(false);
        if (data.house === null) setError('Введите полный адрес до дома!');
        else {
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
        }
    }

    return (
        <div className={styles.main}>
            {showHeader && <div className={styles.header}>Адрес</div> }
           Введите адрес и выберите из списка.
            <div className={styles.input}>
            <AddressSuggestions selectOnBlur defaultQuery={defaultValue} token="56f00db2c366abb68541863cad53bbee37215ef6" delay={350} onChange= { onSelectAdress} inputProps = {{
                placeholder: 'Введите адрес',
            }}/>
            {error && <div className={styles.error}>{error}</div> }
            </div>
        </div>
    );
};

export default Address;