import { Filters } from './components/Filters';
import { Table } from './components/Table';
import { useDispatch, useSelector } from "react-redux";
import { getRespList } from "../../../store/resp/respSlice.js";
import { Spinner } from '../../../components/Spinner.jsx';
import { LOADING_STATUS } from '../../../constants/loadingStatus.js';
import { Pagination } from './components/Pagination.jsx';
import { useCallback, useEffect, useState } from 'react';

export const RespListPage = () => {
    const getRespListLS = useSelector(state => state.resp.getRespListLS);
    return (
        <>
            {getRespListLS === LOADING_STATUS.IN_PROGRESS ? <Spinner /> : ""}
            <Filters />
            <Pagination />
            <Table />
            <div className='mt-3'></div>
            <Pagination />
            <div className='mb-3'></div>
        </>
    )
}