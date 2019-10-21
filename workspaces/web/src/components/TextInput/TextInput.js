import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TextInput.scss';

const TextInput = React.forwardRef((props, ref) => {
  const { id, name, type, value, label, rootClassName, error, disabled, onChange } = props;

  return (
    <div
      className={classNames('text-input__component', {
        error: !!error,
        [rootClassName]: !!rootClassName,
      })}
    >
      <div className="text-input__component__row">
        {label && <label htmlFor={id}>{label}</label>}
        <input
          ref={ref}
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {error && <span>{error}</span>}
    </div>
  );
});

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  rootClassName: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

TextInput.defaultProps = {
  value: undefined,
  type: 'text',
  label: null,
  rootClassName: null,
  error: null,
  disabled: null,
  onChange: null,
};

export default TextInput;
