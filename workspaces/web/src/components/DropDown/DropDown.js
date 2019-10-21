import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './DropDown.scss';

const DropDown = React.forwardRef((props, ref) => {
  const { id, name, children, value, label, error, disabled, onChange } = props;

  return (
    <div
      className={classNames('drop-down__component', {
        error: !!error,
      })}
    >
      <div className="drop-down__component__row">
        {label && <label htmlFor={id}>{label}</label>}
        <select ref={ref} id={id} name={name} value={value} onChange={onChange} disabled={disabled}>
          {children}
        </select>
      </div>
      {error && <span>{error}</span>}
    </div>
  );
});

DropDown.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onChange: PropTypes.func,
};

DropDown.defaultProps = {
  value: undefined,
  label: null,
  error: null,
  disabled: null,
  onChange: null,
};

export default DropDown;
