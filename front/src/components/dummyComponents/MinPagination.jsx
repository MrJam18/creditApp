import { TablePagination } from '@mui/material';
import React, { useState } from 'react';
import styles from '../../css/pagination.module.css'
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    main: {
        border: 'none',
    }
})

const MinPagination = ({total, pageUpdater }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const limit = 10;
    const pageChanger = (ev, page)=> {
        setPage(page);
        pageUpdater(limit, page+1);
    }
    return (
        <div className={styles.main}>
        <TablePagination count={total} style={{paddingLeft: 0}} rowsPerPage={limit} className={classes.main} onPageChange={pageChanger} rowsPerPageOptions={[10]} page={page} />   
        </div>
    );
  };

export default MinPagination;