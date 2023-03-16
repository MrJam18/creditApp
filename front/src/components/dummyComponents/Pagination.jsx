import { TablePagination } from '@mui/material';
import React, { useState } from 'react';
import styles from '../../css/pagination.module.css'
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    main: {
        border: 'none',
    }
})

const Pagination = ({total, pageUpdater, defaultLimit=25 }) => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(defaultLimit);
    const pageChanger = (ev, page)=> {
        setPage(page);
        pageUpdater(limit, page+1);
    }
    const limitChanger = (ev)=> {
        const currentLimit = ev.target.value;
        setLimit(currentLimit);
       pageUpdater(currentLimit, 1);
    }
    return (
        <div className={styles.main}>
        <TablePagination count={total} style={{paddingLeft: 0}} shape="rounded" rowsPerPage={limit} className={classes.main} onPageChange={pageChanger} labelRowsPerPage='записей на странице:' rowsPerPageOptions={[10, 25, 50]} page={page} onRowsPerPageChange={limitChanger}/>   
        </div>
    );
  };

export default Pagination;