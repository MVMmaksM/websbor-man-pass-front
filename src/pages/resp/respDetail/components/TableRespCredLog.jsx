import { IsoToLocaleDate } from "../../../../components/IsoToLocaleDate";

export const TableRespCredLogs = ({ respCredLogList }) => {

    return (
        <div className="mt-3">
            <table className="table table-hover"
                style={{ fontSize: '15px' }}
            >
                <thead className="align-middle">
                    <tr>
                        <th></th>
                        <th >№</th>
                        <th>Дата</th>
                        <th>Пользователь</th>
                        <th>Операция</th>
                        <th>Лог</th>
                    </tr>
                </thead>
                <tbody>
                    {respCredLogList.map(l => (
                        <tr className={l.operation === 'Изменение' && l.log.startsWith('"Пароль" изменился с') ? "table-secondary" : ""}  key={l.resp_cred_log_id}>
                            <td></td>
                            <td>{l.resp_cred_log_id}</td>
                            <td><IsoToLocaleDate iso={l.created_on_tz} /></td>
                            <td>{l.user}</td>
                            <td>{l.operation}</td>
                            <td style={{width: '50%'}}>{l.log}</td>
                        </tr>))
                    }
                </tbody>
            </table>
        </div>
    )
}