export const Filters = () => {


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
                    <div className="card card-body">
                        <div className="row">
                            <div className="col-lg-2">
                                <input
                                    id="okpo"
                                    name="okpo"
                                    type="number"
                                    className="form-control"
                                    autoComplete="okpo"
                                    placeholder="ОКПО"
                                    onWheel={(e) => e.target.blur()}
                                    min="0"
                                />
                            </div>
                            <div className="col-lg-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    autoComplete="name"
                                    placeholder="Наименование"
                                />
                            </div>
                            <div className="col-lg-2">
                                <input
                                    id="date"
                                    name="date"
                                    type="text"
                                    className="form-control"
                                    autoComplete="date"
                                    placeholder="Дата добавления"
                                />
                            </div>
                            <div className="col-lg-2">
                                <input
                                    id="user"
                                    name="user"
                                    type="text"
                                    className="form-control"
                                    autoComplete="user"
                                    placeholder="Пользователь добавивший"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-2">
                                <button className="btn btn-outline-primary me-3">Применить</button>
                                <button className="btn btn-outline-secondary">Очистить</button>
                            </div>                    
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}