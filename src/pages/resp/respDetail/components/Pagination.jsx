import { useDispatch, useSelector } from "react-redux";
import { getRespCredLog, setPaginationRespCredLog } from "../../../../store/resp/respSlice";

export const Pagination = ({ resp_cred_id }) => {
    const dispatch = useDispatch();
    //пагинация
    const pagination = useSelector(state => state.resp.respCredLogPagination);
    //список логов
    const respCredLog = useSelector(state => state.resp.respCredLog);

    //перед
    const next = () => {
        const newPagination = { limit: pagination.limit, offset: pagination.limit + pagination.offset }
        dispatch(setPaginationRespCredLog(newPagination));
        dispatch(getRespCredLog({ ...newPagination, resp_cred_id }));
    };

    //назад
    const back = () => {
        const newPagination = { limit: pagination.limit, offset: pagination.offset - pagination.limit }
        dispatch(setPaginationRespCredLog(newPagination));
        dispatch(getRespCredLog({ ...newPagination, resp_cred_id }));
    };

    return (
        <div className="d-flex flex-direction-row align-items-center justify-content-end">
            <button
                className="btn btn-outline p-0 me-2"
                style={{ border: 'none' }}
                onClick={() => back()}
                disabled={pagination.offset === 0}
            >
                <i className="bi bi-arrow-left-circle fs-5 text-secondary"></i>
            </button>

            <span className="text-secondary">
                {pagination.offset} - {respCredLog?.length < pagination.limit && pagination.offset === 0 ?
                    respCredLog?.length :
                    `${pagination.offset + pagination.limit}+`}
            </span>

            <button
                className="btn btn-outline"
                style={{ border: 'none' }}
                onClick={() => next()}
                disabled={respCredLog?.length < pagination.limit}>
                <i className="bi bi-arrow-right-circle fs-5 text-secondary"></i>
            </button>
        </div>
    )
}