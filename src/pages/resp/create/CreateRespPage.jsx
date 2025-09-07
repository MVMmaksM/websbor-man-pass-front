import { Link } from "react-router-dom";
import { CreateRespForm } from "./components/CreateRespForm";


export const CreateRespPage = () => {

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
                                <span style={{ fontSize: '13px' }}>Добавить респондента</span>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <CreateRespForm />
        </div>
    )
}