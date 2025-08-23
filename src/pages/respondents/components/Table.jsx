import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getRespondents } from "../../../store/respondents/respondentsSlice"
import { Spinner } from "../../../components/Spinner"
import { RespCard } from "./RespCard";

export const Table = () => {
    const getRespLS = useSelector(state => state.respondents.getRespLS);
    const respondents = useSelector(state => state.respondents.respondents);
    const dispatch = useDispatch()

    useEffect(() => {    
        dispatch(getRespondents());
        if (getRespLS === 'success') {
            respondents.map(resp => (
                <RespCard key={resp.resp_id} resp={resp} />
            ))
        }
    }, [])

    return (
        <>
            <div className="container-fluid mt-3">
                <div className="table-container">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ОКПО</th>
                                <th>Наименование</th>
                                <th>Дата создания</th>
                                <th>Действия</th>
                            </tr>
                        </thead>                        
                            {getRespLS === 'success' ? <tbody>{respondents.map(resp => (
                                <RespCard key={resp.resp_id} resp={resp} />
                            ))}</tbody>: ""}                        
                    </table>
                </div>
                {getRespLS === 'in progress' ? <Spinner /> : ""}
            </div>
        </>
    )
}