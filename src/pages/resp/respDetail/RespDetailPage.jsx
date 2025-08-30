import { Link, useParams } from "react-router-dom";
import { RespForm } from "./components/RespForm.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../../components/Spinner.jsx";
import { getRespDetail } from "../../../store/resp/respSlice.js";
import { LOADING_STATUS } from "../../../constants/loadingStatus.js";
import { ButtonPanel } from "./components/ButtonPanel.jsx";
import { Header } from "./components/Header.jsx";

export const RespDetailPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const getRespDetailLS = useSelector(state => state.resp.getRespDetailLS);
    const respDetail = useSelector(state => state.resp.respDetail);
    const resp_cred_id = params.resp_cred_id;

    useEffect(() => {
        dispatch(getRespDetail(resp_cred_id))
    }, []);


    return (
        <div className="container-fluid ps-4 pe-4 pt-4 bg-white">

            <div className="row mb-3">
                <div className="col-lg-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/main/resp" className="text-decoration-none" style={{ fontSize: '13px' }}>
                                    Учетные данные респондентов
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <span style={{ fontSize: '13px' }}>Детали респондента №{resp_cred_id}</span>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {getRespDetailLS === LOADING_STATUS.IN_PROGRESS ? <Spinner /> : ""}
            {getRespDetailLS === LOADING_STATUS.SUCCESS ?
                <>
                    <Header respDetail={respDetail}/>
                    <ButtonPanel />
                    <RespForm respDetail={respDetail} />
                </>
                : ""}
        </div>)
}