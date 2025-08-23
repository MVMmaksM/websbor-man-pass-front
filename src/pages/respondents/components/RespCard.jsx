

export const RespCard = ({ resp }) => {
    return (
        <>
            <tr>
                <td>{resp.resp_id}</td>
                <td>{resp.okpo}</td>
                <td>{resp.name}</td> 
                <td>{resp.dateCreate}</td>               
                <td>
                    <button className="btn btn-outline-primary btn-sm">Редактировать</button>
                    <button className="btn btn-outline-danger btn-sm ms-1">Удалить</button>
                </td>
            </tr>
        </>
    )
}