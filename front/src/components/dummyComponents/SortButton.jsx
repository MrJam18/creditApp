import React, { useEffect, useState } from 'react';
import ArrowDirection from './ArrowDirection';
const SortButton = ({sortHandler, header, focus}) => {
    const [arrow, setArrow] = useState(false);
    const [reverse, setReverse] = useState(false);
    const changeFocusHandler = () => {
        if (focus !== header.key) {
            setArrow(false);
            setReverse(false);
        }
    }
    const changeReverseHandler = () => {
        if(reverse === true) {
            setArrow(true)
        }
        else {
            setArrow(false)
        }

    }
    useEffect(changeFocusHandler, [focus]);
    const clickHandler = (ev) => {
        if (focus === header.key) setArrow(!arrow);
        const colKey = ev.currentTarget.getAttribute('datakey');
        let type;
        if(!reverse) type = 'ASC';
        else type = 'DESC';
        sortHandler(colKey, type);
        setReverse(!reverse);
    }
    return (   
           <button className='antibutton' style={{color: focus !== header.key ? 'grey' : null, padding: 0, paddingLeft: '2px'}} datakey={header.key} onClick={clickHandler}><ArrowDirection arrow={arrow} /></button> 
    );
};

export default SortButton;