import Select from 'react-select';

export const CustomSelect = ({options, onChange, name, value, placeholder, onMenuOpen, isClearable = true}) => { 
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused
                ? '#86b7fe' 
                : '#ced4da', 
            boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(13, 110, 253, 0.25)' : 'none',
            borderRadius: '0.375rem', 
            padding: '0rem 0.375rem 0rem 0.75rem ',
            fontSize: '1rem',
            backgroundColor: '#fff',
            height: '38px',
            minHeight: '38px',
            display: 'flex',
            alignItems: 'center',
            width: '100%'
        }),

        valueContainer: (provided) => ({
            ...provided,
            padding: 0,
        }),

        input: (provided) => ({
            ...provided,
            margin: 0,
            padding: 0,
        }),

        placeholder: (provided) => ({
            ...provided,
            color: '#6c757d', // Bootstrap muted color
        }),

        dropdownIndicator: (provided) => ({
            ...provided,
            padding: '6px',
        }),

        clearIndicator: (provided) => ({
            ...provided,
            padding: '6px',
        }),

        menu: (provided) => ({
            ...provided,
            marginTop: '0.125rem',
            borderRadius: '0.375rem',
            border: '1px solid #ced4da',
            boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
        }),

        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#0d6efd'
                : state.isFocused
                    ? '#e9ecef'
                    : 'white',
            color: state.isSelected ? 'white' : 'black',
            padding: '0.5rem 1rem',
        }),

        singleValue: (provided) => ({
            ...provided,
            color: 'black',
        }),
    };

    return (
        <div>
            <Select
                id="react-select"
                instanceId="react-select"
                options={options}
                placeholder={placeholder}
                noOptionsMessage={() => 'Не найдено'}
                styles={customStyles}    
                isClearable={isClearable}    
                onChange={onChange}      
                name={name}  
                value={value} 
                onMenuOpen={onMenuOpen}
            />
        </div>
    );
}