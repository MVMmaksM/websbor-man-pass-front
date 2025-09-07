import { IsoToLocaleDate } from "../../../../components/IsoToLocaleDate"

export const Header = ({ respDetail }) => {

    return (
        <div className="row mb-3">
            <div className="col-lg-6">
                <div className="d-flex flex-wrap gap-3" style={{ fontSize: '14px' }}>
                    <span>
                        <span className="text-secondary">Респондент:</span>
                        <strong> №{respDetail.resp_cred_id}</strong>
                    </span>
                    <span>
                        <span className="text-secondary">Создано:</span>
                        <strong> <IsoToLocaleDate iso={respDetail.created_on_tz} /></strong>
                    </span>
                    <span>
                        <span className="text-secondary">Создал:</span>
                        <strong> {respDetail.created_by_str}</strong>
                    </span>
                </div>
            </div>
        </div>
    )
}