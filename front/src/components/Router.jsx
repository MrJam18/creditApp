
import '../css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from './List';
import Menu from './Menu';
import Claim from './Claim';
import Contract from './contract/Contract';
import PrivateAccess from './dummyComponents/PrivateAccess';
import PublicAccess from './dummyComponents/PublicAccess';
import Login from './Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../store/users/actions';
import { getLoading } from '../store/users/selectors';
import Loading from './dummyComponents/Loading';
import HidingAlert from './dummyComponents/HidingAlert';
import Start from './start/Start';
import Creditors from './creditors/Creditors';
import { getGlobalError, setGlobalError } from '../store/global';
import { setAlert } from '../store/alert/actions';
import usersSlice from '../store/users/reducer';
import LeftMenu from './LeftMenu';
import Agents from './agents/Agents';
import Debtor from './debtor/Debtor';
import Cessions from "./cessions/Cessions";
import Test from "./Test";


function Router() {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const error = useSelector(getGlobalError);
  useEffect(()=> {
    if(localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
    else(dispatch(usersSlice.actions.setloading(false)));
  }, []);
  useEffect(()=> {
    setAlert('Ошибка', error, 'error');
    dispatch(setGlobalError(false));
  }, [error]);
  if(loading) return <Loading />;
  return (
      <>
        <Menu/>
        <LeftMenu />
        <HidingAlert></HidingAlert>
            <Routes>
            <Route path='login' exact element={<PublicAccess wrapped={<Login />}  />} />
            <Route path='list' exact element = {<PrivateAccess Wrapped={<List />} />} />
            <Route path= 'claim' exact element= {<PrivateAccess Wrapped={<Claim />}  />} />
            <Route path='organizations' exact element={<PrivateAccess Wrapped={<Creditors />} />} />
            <Route path='agents' exact element={<PrivateAccess Wrapped={<Agents />} />} />
            <Route path='contracts/:contractId' element= {<PrivateAccess Wrapped={<Contract />} /> } />
            <Route path='debtors/:debtorId' element={<PrivateAccess Wrapped={<Debtor />} />} />
            <Route path='/' element={<PrivateAccess Wrapped={<Start />} />} />
            <Route path='cessions' element={<PrivateAccess Wrapped={<Cessions />} /> } />
                <Route path='test' element={<Test />} />
            </Routes>
            </>
      
      
      
      
      
      
      
      
      
  );
}

export default Router;
