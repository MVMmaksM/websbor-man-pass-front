import DatePicker from 'react-datepicker';

export const CustomDatePicker = ({ selected, onChange, name, placeholder }) => {

    const CustomDateInput = ({ value, onClick }) => (
        <div id="custom_date" onClick={onClick}>
            <i id="custom_date_icon" className="bi bi-calendar"></i>
            <input
                id="custom_date_input"
                type="text"
                value={value}
                readOnly
                className="form-control"
                placeholder={placeholder}              
            />
        </div>
    );

    return (
        <DatePicker
            selected={selected}
            onChange={onChange}
            dateFormat="dd.MM.yyyy"
            name={name}
            locale="ru"
            isClearable
            customInput={<CustomDateInput />}
        />
    )
}