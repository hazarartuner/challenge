import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import NotFoundError from 'errors/NotFoundError';
import { login, register } from 'redux/ducks/auth/actions';
import useForm from 'react-hook-form';
import { emailRegex } from 'helpers/regexs';
import generatePath from 'helpers/generatePath';
import TextInput from 'components/TextInput';
import DropDown from 'components/DropDown';
import './LoginForm.scss';

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register: registerForm, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showRegisterFields, setShowRegisterFields] = useState(false);

  const onSubmit = ({ name, email, role }) => {
    setIsLoading(true);

    (showRegisterFields ? dispatch(register({ name, email, role })) : dispatch(login(email)))
      .then(() => {
        history.push(generatePath('sessions'));
      })
      .catch(error => {
        if (error instanceof NotFoundError) {
          setShowRegisterFields(true);
        } else {
          // @todo: Create an app specific notification modal and use it in here
        }
      })
      .finally(() => {
        // delay it for better UX
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  };

  return (
    <div className="login-form__component">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {showRegisterFields && (
          <TextInput
            id="name"
            name="name"
            label="Name"
            type="text"
            ref={registerForm({ required: true })}
            error={errors.name && 'Invalid name'}
            disabled={isLoading}
          />
        )}

        <TextInput
          id="email"
          name="email"
          label="E-Mail"
          type="email"
          ref={registerForm({ pattern: emailRegex })}
          error={errors.email && 'Invalid e-mail'}
          disabled={isLoading}
        />

        {showRegisterFields && (
          <DropDown
            id="role"
            name="role"
            label="Role"
            ref={registerForm({ required: true })}
            error={errors.role && 'Select one'}
            disabled={isLoading}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <option />
            <option value="DEVELOPER">DEVELOPER</option>
            <option value="MASTER">SCRUM MASTER</option>
          </DropDown>
        )}

        <button className="button" type="submit" disabled={isLoading}>
          {isLoading && 'Loading...'}
          {!isLoading && (showRegisterFields ? 'Register' : 'Login')}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
