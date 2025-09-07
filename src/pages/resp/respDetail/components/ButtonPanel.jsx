import { useNavigate } from "react-router-dom"

export const ButtonPanel = ({ resp_cred_id }) => {
    const navigate = useNavigate();

    return (
        <div className="row mb-3">
            <div className="col-lg-6">
                <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => { navigate(`edit/${resp_cred_id}`) }}
                >Редактировать</button>
                <button className="btn btn-outline-danger">Удалить</button>
            </div>
        </div>
    )
}