import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getRespList } from "../../../../store/resp/respSlice"
import { Spinner } from "../../../../components/Spinner"
import { RespCard } from "./RespCard";
import { LOADING_STATUS } from "../../../../constants/loadingStatus";

export const Table = () => {
    const getRespListLS = useSelector(state => state.resp.getRespListLS);
    const respList = useSelector(state => state.resp.respList);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getRespList({ limit: 200, offset: 0 }));
    }, [])

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="table-container">
                    <table id="table-resp" className="table table-hover mb-0 ml-5">
                        <thead>
                            <tr>
                                <th className="w-30 border-none"></th>
                                <th className="resp-col-id">№</th>
                                <th className="resp-col-okpo">ОКПО</th>
                                <th className="resp-col-name">Наименование</th>
                                <th className="resp-col-date">Дата</th>
                                <th className="resp-col-user">Пользователь</th>
                                <th className="resp-col-is_active">Активно</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        {getRespListLS === LOADING_STATUS.SUCCESS ? <tbody>{respList.map(resp => (
                            <RespCard key={resp.resp_cred_id} resp={resp} />
                        ))}</tbody> : ""}
                    </table>
                </div>
                {getRespListLS === LOADING_STATUS.IN_PROGRESS ? <Spinner /> : ""}
            </div>
        </>
    )
}