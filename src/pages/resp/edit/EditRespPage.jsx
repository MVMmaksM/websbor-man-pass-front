import { Link, useParams } from "react-router-dom";
import { EditRespForm } from "./components/EditRespForm";

export const EditRespPage = () => {
    const params = useParams();

    return (
        <div className="container-fluid ps-4 pe-4 pt-4 bg-white">

            <div className="row mb-3">
                <div className="col-lg-6">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">

                            <li className="breadcrumb-item">
                                <Link to="/main/resp" className="text-decoration-none" style={{ fontSize: '13px' }}>
                                    Учетные данные респондентов
                                </Link>
                            </li>

                            {location.pathname.includes(`/resp/${params.resp_cred_id}/edit`) ?
                                <li className="breadcrumb-item">
                                    <Link to={`/main/resp/${params.resp_cred_id}`} className="text-decoration-none" style={{ fontSize: '13px' }}>
                                        Детали респондента №{params.resp_cred_id}
                                    </Link>
                                </li> : ""}

                            <li className="breadcrumb-item active" aria-current="page">
                                <span style={{ fontSize: '13px' }}>Редактирование респондента №{params.resp_cred_id}</span>
                            </li>

                        </ol>
                    </nav>
                </div>
            </div>
            <EditRespForm resp_cred_id={params.resp_cred_id} />
        </div>
    )
}