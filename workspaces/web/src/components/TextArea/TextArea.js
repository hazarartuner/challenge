import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TextArea.scss';

const TextArea = React.forwardRef((props, ref) => {
  const { id, name, value, label, rootClassName, error, disabled, onChange } = props;

  return (
    <div
      className={classNames('text-area__component', {
        error: !!error,
        [rootClassName]: !!rootClassName,
      })}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <textarea ref={ref} id={id} name={name} onChange={onChange} disabled={disabled}>
        {value}
      </textarea>
      {error && <span>{error}</span>}
    </div>
  );
});

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  rootClassName: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

TextArea.defaultProps = {
  value: undefined,
  label: null,
  rootClassName: null,
  error: null,
  disabled: null,
  onChange: null,
};

export default TextArea;
