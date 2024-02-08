// Определение базовых стилей
const baseStyles = {
  control: (width) => (provided) => ({
    ...provided,
    width: width,
    height: '46px',
    borderRadius: '12px',
    background: '#282828',
    border: 'none',
    color: '#fbfcfc',
    textIndent: '10px',
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fbfcfc',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#fbfcfc',
  }),
  menu: (provided) => ({
    ...provided,
    background: '#282828',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#505050' : '#282828',
    color: '#fbfcfc',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#505050',
    },
  }),
};

// Использование базовых стилей для создания конкретных стилей с различной шириной
const customStyles = {
  control: baseStyles.control('182px'),
  singleValue: baseStyles.singleValue,
  dropdownIndicator: baseStyles.dropdownIndicator,
  menu: baseStyles.menu,
  option: baseStyles.option,
};

const customStylesSen = {
  control: baseStyles.control('214px'),
  singleValue: baseStyles.singleValue,
  dropdownIndicator: baseStyles.dropdownIndicator,
  menu: baseStyles.menu,
  option: baseStyles.option,
};

// Экспорт оптимизированных стилей
export { customStylesSen, customStyles };
