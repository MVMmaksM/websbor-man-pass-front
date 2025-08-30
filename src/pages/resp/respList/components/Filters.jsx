import { useState } from "react"
import { useDispatch } from "react-redux";
import { getRespList } from "../../../../store/resp/respSlice.js";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {toLocalISOString} from "../../toLocalISOString.js";

export const Filters = () => {
    const dispatch = useDispatch();

    const [filter, setFilter] = useState({
        limit: 200,
        offset: 0,
        okpo: '',
        resp_cred_id: '',
        name: '',
        start_created_on_tz: ''
    });

    const onChangeFilter = (e) => {
        const { name, value } = e.target;

        setFilter(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const onSubmitFilter = async () => {      
        dispatch(getRespList(filter))
    }

    const onResetFilter = async () => {
        //в отдельную переменную
        //т.к. в диспатч уходят старые фильтры
        //ибо setFilter асинхронная
        const resetFilter = {
            limit: 200,
            offset: 0,
            okpo: '',
            resp_cred_id: '',
            name: ''
        }

        setFilter(resetFilter);
        dispatch(getRespList(resetFilter))
    }

    return (
        <>
            <div className="ms-3 mt-3 d-flex align-items-center gap-2">
                <a
                    className="btn btn-outline"
                    data-bs-toggle="collapse"
                    href="#collapseExample"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                >
                    <i className="bi bi-filter fs-5"></i>
                </a>
            </div>
            <div className="collapse mt-3" id="collapseExample">
                <div className="container-fluid">
                    <div className="card-body bg-light">
                        <div className="row">
                            <div className="col-lg-2">
                                <input
                                    id="okpo"
                                    name="okpo"
                                    type="number"
                                    className="form-control"
                                    autoComplete="okpo"
                                    placeholder="ОКПО"
                                    onChange={onChangeFilter}
                                    onWheel={(e) => e.target.blur()}
                                    min="0"
                                    value={filter.okpo}
                                />
                            </div>
                            <div className="col-lg-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    autoComplete="name"
                                    placeholder="Наименование респондента"
                                    onChange={onChangeFilter}
                                    value={filter.name}
                                />
                            </div>
                            <div className="col-lg-2">
                                <input
                                    id="resp_cred_id"
                                    name="resp_cred_id"
                                    type="number"
                                    className="form-control"
                                    autoComplete="resp_cred_id"
                                    placeholder="Номер респондента"
                                    onWheel={(e) => e.target.blur()}
                                    min="0"
                                    onChange={onChangeFilter}
                                    value={filter.resp_cred_id}
                                />
                            </div>
                            <div className="col-lg-2">
                                <DatePicker
                                    selected={filter.start_created_on_tz ? new Date(filter.start_created_on_tz) : null}
                                    onChange={(date) => setFilter(prev => ({ ...prev, start_created_on_tz: date? toLocalISOString(date) : date}))}
                                    dateFormat="dd.MM.yyyy"
                                    placeholderText="Дата создания с"
                                    className="form-control"
                                    name="start_created_on_tz"
                                    id="start_created_on_tz"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-2">
                                <button
                                    className="btn btn-outline-primary me-3"
                                    onClick={onSubmitFilter}
                                >Применить</button>
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={onResetFilter}
                                >Очистить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}