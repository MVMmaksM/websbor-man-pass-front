import { useSelector } from "react-redux";
import { LOADING_STATUS } from "../../../../constants/loadingStatus.js";
import { IsoToLocaleDate } from "../../../../components/IsoToLocaleDate.jsx";
import { Spinner } from "../../../../components/Spinner.jsx";

export const UsersTable = () => {
    const usersList = useSelector(state => state.users.usersList);
    const getUsersListLS = useSelector(state => state.users.getUsersListLS);

    return (
        <>
            {getUsersListLS === LOADING_STATUS.IN_PROGRESS && <Spinner />}

            {getUsersListLS === LOADING_STATUS.SUCCESS && usersList.length > 0 &&
                <div className="mt-3">
                    <table className="table table-striped table-hover"
                        style={{ fontSize: '15px' }}
                    >
                        <thead className="align-middle">
                            <tr>
                                <th></th>
                                <th>Логин</th>
                                <th>Дата создания</th>
                                <th>Роль</th>
                                <th>Последний вход</th>
                                <th>Заблокирован</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersList.map(u => (
                                <tr key={u.user_id}>
                                    <td></td>
                                    <td>{u.login}</td>
                                    <td><IsoToLocaleDate iso={u.created_on_tz} /></td>
                                    <td>{u.role}</td>
                                    <td>{u.last_auth_on_tz ? <IsoToLocaleDate iso={u.last_auth_on_tz} /> : "Не указано"}</td>
                                    <td>{u.is_blocked ? "Да" : "Нет"}</td>
                                    <td><button className="btn btn-outline-danger btn-sm ms-1">Заблокировать</button></td>
                                </tr>))
                            }
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}