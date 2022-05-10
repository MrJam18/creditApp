import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsOnline } from '../../store/users/selectors';

const PublicAccess = ({wrapped}) => {
    const authorization = useSelector(getIsOnline);
    return !authorization ? wrapped : <Navigate to= '/' />
};

export default PublicAccess;