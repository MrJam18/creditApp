import { contractsSlice } from "../contracts/reducer";
import api from "../../http";
// import { debtorsSlice } from "./reducer";
import { listSlice } from './reducer';
import { setAlert } from "../alert/actions";


const actions = listSlice.actions;
const contractsActions = contractsSlice.actions;



export const recieveList = (limit=25, page=1, search=null) =>  async (dispatch) =>  {
    dispatch(actions.setListLoading(true));
    try {
    const {data} = await api.get(`list/getList?limit=${limit}&page=${page}&search=${search}`);
    dispatch(contractsActions.setContracts(data.contractsList));
    dispatch(actions.changeList({list: data.debtorsList, rows: data.totalRows}));
    }
    catch(e) {
        setAlert('Ошибка подключения.', e.message, 'error');
    }
    finally{
        dispatch(actions.setListLoading(false));
    }

}
