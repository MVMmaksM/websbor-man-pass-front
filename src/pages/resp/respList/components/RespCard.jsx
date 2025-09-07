import { Link } from "react-router-dom";
import { IsoToLocaleDate } from "../../../../components/IsoToLocaleDate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const RespCard = ({ resp }) => {
    const userData = useSelector(state => state.profile.userData);
    const navigate = useNavigate();

    return (
        <>
            <tr>
                <td></td>
                <td>
                    <Link data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Перейти в детали"
                        className="text-decoration-none"
                        to={`/main/resp/${resp.resp_cred_id}`}>
                        <strong>{resp.resp_cred_id}</strong>
                    </Link>
                </td>
                <td>{resp.okpo}</td>
                <td>{resp.resp_name}</td>
                <td>
                    <div className="mt-3">
                        <p className="mb-0">
                            <span className="text-secondary">Создано: </span>
                            <IsoToLocaleDate iso={resp.created_on_tz} /></p>
                        <p>
                            <span className="text-secondary">Изменено: </span>
                            {resp.updated_on_tz ? <IsoToLocaleDate iso={resp.updated_on_tz} /> : "Не указано"}
                        </p>
                    </div>
                </td>
                <td>
                    <div className="mt-3">
                        <p className="mb-0">
                            <span className="text-secondary">Создал: </span>
                            <Link className="text-decoration-none"
                                to={userData.user_id === resp.created_by ? '/profile' : '/users'}>
                                {resp.created_by_str}
                            </Link>
                        </p>
                        <p>
                            <span className="text-secondary">Изменил: </span>
                            {resp.updated_by_str ?
                                <Link className="text-decoration-none"
                                    to={userData.user_id === resp.updated_by ? '/profile' : '/users'}>
                                    {resp.updated_by_str}
                                </Link>
                                : "Не указано"}

                        </p>
                    </div>
                </td>
                <td>
                    {resp.is_active ? "Да" : "Нет"}
                </td>
                <td>
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => navigate(`edit/${resp.resp_cred_id}`)}
                    >Редактировать</button>
                    <button className="btn btn-outline-danger btn-sm ms-1">Удалить</button>
                </td>
            </tr>
        </>
    )
}