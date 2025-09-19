export const TableForms = ({ formList }) => {
    return (
        <div className="mt-3">
            <table className="table table-striped table-hover"
                style={{ fontSize: '15px' }}
            >
                <thead className="align-middle">
                    <tr>
                        <th></th>
                        <th >ОКУД</th>
                        <th>Индекс формы</th>
                        <th>Наименование формы</th>
                        <th>Периодичность формы</th>
                        <th>Срок сдачи формы</th>
                        <th>Отчетный период</th>
                        <th>Описание</th>
                        <th>Комментарий</th>
                        <th>№ приказа</th>
                        <th>Дата приказа</th>
                    </tr>
                </thead>
                <tbody>
                    {formList.map(f => (
                        <tr key={f.okud}>
                            <td></td>
                            <td>{f.okud}</td>
                            <td>{f.index}</td>
                            <td>{f.name}</td>
                            <td>{f.form_period}</td>
                            <td>{f.end_time}</td>
                            <td>{f.reported_period}</td>
                            <td>{f.description}</td>
                            <td>{f.comment}</td>
                            <td>{f.act_num}</td>
                            <td style={{
                                whiteSpace: 'nowrap'
                            }}>{f.act_date}</td>
                        </tr>))
                    }
                </tbody>
            </table>
        </div>
    )
}