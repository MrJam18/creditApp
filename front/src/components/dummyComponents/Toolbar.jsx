import React, {useState} from 'react';
import styles from '*/toolbar.module.css';

const Toolbar = ({elements}) => {
    return (
        <div className={styles.toolbar}>
            {
                elements.map((el) => <ToolbarElement Icon={el.icon} ToolWindow={el.toolWindow} />)
            }
        </div>
    );
};

function ToolbarElement ({Icon, ToolWindow}) {
    const [show, setShow] = useState(false);
    const Button = () => <button className={'antibutton' + ' ' + styles.icon} onClick={()=> setShow(true)}><Icon /></button>
    return <>
        <Button />
        {show && <ToolWindow setShow={setShow} />}
    </>
}

export default Toolbar;