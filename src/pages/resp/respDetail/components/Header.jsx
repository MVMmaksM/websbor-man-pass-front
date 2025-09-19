import { useSelector } from "react-redux"
import { IsoToLocaleDate } from "../../../../components/IsoToLocaleDate"
import { LOADING_STATUS } from "../../../../constants/loadingStatus";

export const Header = () => {
    const respDetail = useSelector(state => state.resp.respDetail);
    const getRespDetailLS = useSelector(state => state.resp.getRespDetailLS);

    return (
        <>
            {getRespDetailLS === LOADING_STATUS.SUCCESS &&
                <div className="row mb-3">
                    <div className="col-lg-12">
                        <div className="d-flex flex-wrap gap-3" style={{ fontSize: '14px' }}>
                            <span>
                                <span className="text-secondary">Респондент:</span>
                                <strong> №{respDetail.resp_cred_id}</strong>
                            </span>
                            <span>
                                <span className="text-secondary">Создано:</span>
                                <strong> <IsoToLocaleDate iso={respDetail.created_on_tz} /></strong>
                            </span>
                            <span>
                                <span className="text-secondary">Создал:</span>
                                <strong> {respDetail.created_by_str}</strong>
                            </span>
                            <span>
                                <span className="text-secondary">Изменено: </span>
                                <strong>
                                    {respDetail.updated_on_tz ?
                                        <IsoToLocaleDate iso={respDetail.updated_on_tz} />
                                        : "Не указано"}
                                </strong>
                            </span>
                            <span>
                                <span className="text-secondary">Изменил: </span>
                                <strong>
                                    {respDetail.updated_by_str ?
                                        respDetail.updated_by_str
                                        : "Не указано"}
                                </strong>
                            </span>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}