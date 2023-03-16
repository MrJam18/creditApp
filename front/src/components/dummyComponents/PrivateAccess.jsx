import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsOnline } from '../../store/users/selectors';

const PrivateAccess = ({Wrapped}) => {
    const authorization = useSelector(getIsOnline);
    return authorization ? Wrapped : <Navigate to= '/login' />
};

export default PrivateAccess;