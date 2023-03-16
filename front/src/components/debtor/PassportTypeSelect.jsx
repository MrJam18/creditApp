import React, {useState} from 'react';
import {InputLabel, MenuItem, Select} from "@mui/material";

const PassportTypeSelect = ({type, setType, className, sx}) => {

    return (
        <>
        <InputLabel id="passportType" sx={sx} required>Вид паспорта</InputLabel>
        <Select className={className} size={'small'} sx={sx} fullWidth variant='standard'
                labelId="passportType"
                value={type}
                name= 'typeId'
                onChange= {(ev)=> setType(ev.target.value)}
        >
            <MenuItem value={'1'}>Паспорт гражданина РФ</MenuItem>
            <MenuItem value={'2'}>Паспорт иностранного гражданина</MenuItem>
            <MenuItem value={'3'}>Заграничный Паспорт гражданина РФ</MenuItem>
            <MenuItem value={'4'}>Вид на жительство на территории РФ</MenuItem>
            <MenuItem value={'4'}>Свидетельство о предоставлении убежища в РФ</MenuItem>
            <MenuItem value={'noPassport'}>Нет паспортных данных</MenuItem>
        </Select>
        </>
    );
};

export default PassportTypeSelect;