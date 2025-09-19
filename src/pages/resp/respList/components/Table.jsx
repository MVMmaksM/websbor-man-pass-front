import { useSelector } from "react-redux";
import { RespCard } from "./RespCard";
import { LOADING_STATUS } from "../../../../constants/loadingStatus";

export const Table = () => {
    const respList = useSelector(state => state.resp.respList);
    const getRespListLS = useSelector(state => state.resp.getRespListLS);

    return (
        <>
            {getRespListLS === LOADING_STATUS.SUCCESS &&
                <div className="container-fluid mt-3">
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
                            <tbody>
                                {respList.map(resp => (
                                    <RespCard key={resp.resp_cred_id} resp={resp} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>}
        </>
    )
}