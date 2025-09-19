import { Link } from "react-router-dom"
import { CreateUserForm } from "./components/CreateUserForm"

export const CreateUserPage = () => {

    return (
        <div className="container-fluid ps-4 pe-4 pt-4 bg-white">

            <div className="row mb-3">
                <div className="col-lg-4">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/main/admin/users" className="text-decoration-none" style={{ fontSize: '13px' }}>
                                    Пользователи
                                </Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                <span style={{ fontSize: '13px' }}>Добавить пользователя</span>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <CreateUserForm />
        </div>
    )
}