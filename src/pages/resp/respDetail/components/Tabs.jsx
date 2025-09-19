import { useEffect, useState } from "react";
import { TableForms } from "./TableForms";
import { TableRespCredLogs } from "./TableRespCredLog.jsx";
import { getForms, clearForms } from "../../../../store/gs/gsSlice.js";
import { getRespCredLog, clearPaginationRespCredLog } from "../../../../store/resp/respSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { LOADING_STATUS } from "../../../../constants/loadingStatus";
import { Spinner } from "../../../../components/Spinner";
import { Pagination } from "./Pagination.jsx";

export const Tabs = ({ resp_cred_id }) => {
    const dispatch = useDispatch();
    //формы
    const getFormsLS = useSelector(state => state.gs.getFormsLS);
    const forms = useSelector(state => state.gs.forms);
    //табы
    const [activeTab, setActiveTab] = useState("forms");
    //организация
    const getOrganizatonLS = useSelector(state => state.gs.getOrganizatonLS);
    const organization = useSelector(state => state.gs.organization);
    //логи
    const getRespCredLogLS = useSelector(state => state.resp.getRespCredLogLS);
    const respCredLog = useSelector(state => state.resp.respCredLog);
    //пагинация логов
    const respCredLogPagination = useSelector(state => state.resp.respCredLogPagination);

    //только после получения деталей организации
    //дергаем формы
    useEffect(() => {
        if (activeTab === "forms" &&
            getOrganizatonLS === LOADING_STATUS.SUCCESS &&
            organization
        ) {
            dispatch(getForms({ org_id: organization.id }));
        } else if (activeTab === "forms" &&
            getOrganizatonLS === LOADING_STATUS.SUCCESS &&
            !organization){
                dispatch(clearForms())
            }
    }, [getOrganizatonLS]);

    //логи
    useEffect(() => {
        if (activeTab === "logs")
            dispatch(getRespCredLog({ resp_cred_id, ...respCredLogPagination }));
    }, [activeTab]);

    //очистка стейтов
    useEffect(() => {
        return () => {
            //очистка стейта списка форм
            dispatch(clearForms());
            //читска стейта пагинации логов
            dispatch(clearPaginationRespCredLog());
        }
    }, []);

    //переключение таб
    const onSetActiveClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className="mt-3">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "forms" ? 'active' : ''}`}
                        href="#"
                        aria-current="page"
                        onClick={(e) => {
                            e.preventDefault();
                            onSetActiveClick("forms")
                        }}>
                        Перечень форм
                    </a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === "logs" ? 'active' : ''}`}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onSetActiveClick("logs")
                        }}>
                        История
                    </a>
                </li>
            </ul>

            <div className="mt-4">

                {/* перечень форм*/}
                {activeTab === "forms" && (getFormsLS === LOADING_STATUS.IN_PROGRESS &&
                    <Spinner color={'primary'}
                        divStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            paddingTop: '30px'
                        }}
                        spinnerStyle={{ width: '30px', height: '30px' }} />)
                }

                {activeTab === "forms" && getFormsLS === LOADING_STATUS.SUCCESS && forms?.length > 0 &&
                    <>
                        <div>
                            <TableForms formList={forms} />
                        </div>
                        <div style={{ height: '50px' }}></div>
                    </>
                }

                {activeTab === "forms" && getFormsLS === LOADING_STATUS.SUCCESS && forms?.length === 0 &&
                    <div className="text-center p-5 text-muted">
                        Не найдены формы статистической отчётности
                    </div>
                }

                {activeTab === "forms" && !organization &&
                    <div className="text-center p-5 text-muted">
                        Не найдены формы статистической отчётности
                    </div>
                }

                {/* логи*/}
                {activeTab === "logs" && (getRespCredLogLS === LOADING_STATUS.IN_PROGRESS &&
                    <Spinner color={'primary'}
                        divStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            paddingTop: '30px'
                        }}
                        spinnerStyle={{ width: '30px', height: '30px' }} />)
                }

                {activeTab === "logs" && getRespCredLogLS === LOADING_STATUS.SUCCESS && respCredLog?.length > 0 &&
                    <>
                        <div>
                            < Pagination resp_cred_id={resp_cred_id} />
                            <TableRespCredLogs respCredLogList={respCredLog} />
                        </div>
                        <div style={{ height: '50px' }}></div>
                    </>
                }

                {activeTab === "logs" && getRespCredLogLS === LOADING_STATUS.SUCCESS && respCredLog?.length === 0 &&
                    <div className="text-center p-5 text-muted">
                        Записей нет
                    </div>
                }
            </div>
        </div >
    )
}