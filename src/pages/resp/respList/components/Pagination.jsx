import { useDispatch, useSelector } from "react-redux";
import { getRespList, setPagination } from "../../../../store/resp/respSlice";

export const Pagination = () => {
    const dispatch = useDispatch();
    //пагинация
    const pagination = useSelector(state => state.resp.pagination);
    //фильтры
    const respFilter = useSelector(state => state.resp.respFilter);
    //список
    const respList = useSelector(state => state.resp.respList);

    //перед
    const next = () => {
        const newPagination = { limit: pagination.limit, offset: pagination.limit + pagination.offset }
        dispatch(setPagination(newPagination));
        dispatch(getRespList({ ...newPagination, ...respFilter }));
    };

    //назад
    const back = () => {
        const newPagination = { limit: pagination.limit, offset: pagination.offset - pagination.limit }
        dispatch(setPagination(newPagination));
        dispatch(getRespList({ ...newPagination, ...respFilter }));
    };

    return (
        <div className="d-flex flex-direction-row align-items-center justify-content-end">
            <button
                title="Назад"
                className="btn btn-outline p-0 me-2"
                style={{ border: 'none' }}
                onClick={() => back()}
                disabled={pagination.offset === 0}
            >
                <i className="bi bi-arrow-left-circle fs-5 text-secondary"></i>
            </button>

            <span className="text-secondary">
                {pagination.offset} - {respList?.length < pagination.limit && pagination.offset === 0 ?
                    respList?.length :
                    `${pagination.offset + pagination.limit}+`}
            </span>

            <button
                title="Вперед"
                className="btn btn-outline"
                style={{ border: 'none' }}
                onClick={() => next()}
                disabled={respList?.length < pagination.limit}>
                <i className="bi bi-arrow-right-circle fs-5 text-secondary"></i>
            </button>
        </div>
    )
}