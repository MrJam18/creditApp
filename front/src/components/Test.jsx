import React from 'react';

/**
 *
 * @param shit fdsfdszfdzsf f dszf dsz fz fzd  f zs dzdsf
 * @param fuck fz zdf zdf zd d zdf z zd
 * @param ass fzds f zdf zdf dz  zfd dzf
 * @returns {JSX.Element}
 * @constructor
 */
const Test = ({shit, fuck, ass}) => {
    return (
        <div>
            <div>1234</div>
            <div tabIndex={2}>1234</div>
            <div tabIndex={3}>1234</div>
            <div tabIndex={1}>dasdadsasda</div>
        </div>
    );
};

export default Test;

Test(123, 321)


function test2({param1, param2}) {
    return param1 + param2
}