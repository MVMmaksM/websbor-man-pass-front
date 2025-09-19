import { Link } from "react-router-dom"

export const BreadcrumbsPage = ({ resp_cred_id, isEdit }) => {

    return (
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
                            <span style={{ fontSize: '13px' }}>{isEdit ? "Редактирование" : "Детали"} респондента №{resp_cred_id}</span>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}   