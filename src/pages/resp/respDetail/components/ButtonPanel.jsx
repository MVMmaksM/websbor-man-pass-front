export const ButtonPanel = ({ isEdit, setIsEdit }) => {   

    return (
        <div className="row mb-3">
            <div className="col-lg-6">
                {
                    !isEdit &&
                    <>
                        <button
                            className="btn btn-outline-primary me-2"
                            onClick={() => { setIsEdit(true) }}
                        >Редактировать</button>
                        <button className="btn btn-outline-danger">Удалить</button>
                    </>
                }
            </div>
        </div>
    )
}