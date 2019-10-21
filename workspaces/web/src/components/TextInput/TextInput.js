import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.scss';

const TextInput = props => {
  const { id, name, value, label, error, disabled, onChange } = props;

  return (
    <div className="text-input__component">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <span>{error}</span>}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

TextInput.defaultProps = {
  value: undefined,
  label: null,
  error: null,
  disabled: null,
  onChange: null,
};

export default TextInput;
