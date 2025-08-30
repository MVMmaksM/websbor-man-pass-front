import {IsoToLocaleDate} from "../../../../components/IsoToLocaleDate";

export const RespForm = ({ respDetail }) => {
    return (
        <div className="row">
            <div className="col-lg-8">
                <div
                    className="p-3"
                    style={{
                        backgroundColor: '#EDEDED',
                        borderRadius: '6px',
                        minHeight: '60px',
                        boxSizing: 'border-box',
                        width: '100%',
                    }}
                >
                    <div className="mb-2">
                        <span className="text-secondary">Наименование</span>
                        <span> {respDetail.name ? respDetail.name : "Не указано"}</span>
                    </div>

                    <div className="d-flex flex-wrap gap-3 align-items-center mb-2">
                        <div className="d-flex align-items-center">
                            <span className="text-secondary me-1">ОКПО</span>
                            <span> {respDetail.okpo ? respDetail.okpo : "Не указано"}</span>
                        </div>

                        <div className="d-flex align-items-center">
                            <span className="text-secondary me-1">Пароль</span>
                            <input
                                type="password"
                                className="form-control-plaintext"
                                value=''
                                disabled
                                autoComplete="off"
                                style={{ width: '55px' }}
                            />
                            <button
                                type="button"
                                className="btn btn-link p-0 border-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Показать пароль"
                            >
                                <i className="bi bi-eye-slash-fill" style={{ color: '#6c757d', cursor: 'pointer' }}></i>
                            </button>
                        </div>
                    </div>

                    <div className="mb-2">
                        <span className="text-secondary me-1">Примечание</span>
                        <span> {respDetail.comment ? respDetail.comment : "Не указано"}</span>
                    </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div
                    className="p-3"
                    style={{
                        backgroundColor: '#EDEDED',
                        borderRadius: '6px',
                        minHeight: '70px',
                        boxSizing: 'border-box',
                        width: '100%',
                    }}
                >
                    <div className="mb-2">
                        <span className="text-secondary">Последнее изменение</span>
                        {respDetail.updated_on_tz ? 
                        <IsoToLocaleDate iso={respDetail.updated_on_tz}/> : 
                        <span> Не указано</span>}
                    </div>
                    <div className="mb-2">
                        <span className="text-secondary">Изменил</span>
                        <span> {respDetail.updated_by ? respDetail.updated_by : "Не указано"}</span>
                    </div>
                    <div className="mb-2">
                        <span className="text-secondary">Активно</span>
                        <span> {respDetail.is_active ? "Да" : "Нет"}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}