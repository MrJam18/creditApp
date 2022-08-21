import {createSlice} from "@reduxjs/toolkit";
import {getLastInfo} from "../../utils/getLastinfo";

const initialState = {
    loading: true,
    searchList: [],
    list: {
        rows: [],
        count: 0
    },
    info: {
        loading: true,
        rows: null,
        count: 0,
        lastInfo: null,
        error: false,
        submitLoading: false,
        showConfirm: false,
        cessionId: null,
        show: false,
        activeCession: 0,
        deleteIds: [],
        forceUpdateCounter: 0,

    }
}
    
    
    
    export const cessionsSlice = createSlice({
        name: 'cessions',
        initialState,
        reducers: {
            setSearchList(state, action) {
                state.searchList = action.payload
            },
            setLoading(state, action) {
                state.loading = action.payload;
            },
            setList(state, action) {
                state.list = action.payload;
            },
            setInfoRows(state, action) {
                state.info.rows = action.payload.rows;
                state.info.count = action.payload.count;
            },
            setInfoRow(state, action) {
                action.payload.data.id = state.info.rows[action.payload.index].id;
                state.info.rows[action.payload.index] = action.payload.data;
            },
            setInfoLoading(state, action) {
                state.info.loading = action.payload;
            },
            setInfoError(state, action) {
                state.info.error = action.payload;
            },
            setSubmitInfoLoading(state, action) {
                state.info.submitLoading = action.payload;
            },
            setInfoShowConfirm(state, action) {
                state.info.showConfirm = action.payload;
            },
            setInfoCessionId(state, action) {
                state.info.cessionId = action.payload;
                state.info.show = true;
            },
            setInfoShow(state, action) {
                state.info.show = action.payload;
            },
            setActiveCession(state, action) {
                state.info.activeCession = action.payload;
            },
            pushInfoRow(state, action) {
                state.info.rows.push({});
                state.info.count++;
                state.info.activeCession = state.info.count - 1;
            },
            deleteInfoRow(state, action) {
                state.info.rows.splice(action.payload, 1);
                state.info.count--;
                state.info.activeCession = state.info.count - 1;
            },
            setInfoDefault(state) {
                state.info = {
                        loading: true,
                        rows: null,
                        count: 0,
                        error: false,
                        submitLoading: false,
                        showConfirm: false,
                        cessionId: null,
                        show: false,
                        activeCession: 0,
                        deleteIds: [],
                        forceUpdateCounter: 0,
                }
            },
            pushDeleteId(state, action) {
                state.info.deleteIds.push(action.payload);
            },
            forceUpdate(state) {
                state.info.forceUpdateCounter++;
            },
            setLastInfo(state) {
                const lastInfo = getLastInfo(state.info.rows);
                state.info.lastInfo = getLastInfo(state.info.rows);
            }
        }
    });
    
