import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TextInput from 'components/TextInput';
import NotFoundError from 'errors/NotFoundError';
import { login } from 'redux/ducks/auth/actions';

const LoginPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login('hazar@gmail.com'))
      .then(response => {
        console.log({ response });
      })
      .catch(error => {
        if (error instanceof NotFoundError) {
          console.log('Not Found!');
        }
      });
  }, [dispatch]);

  return (
    <div className="login__page">
      <h1>Login Page</h1>
      <TextInput label="Name" id="name" name="name" />
      <TextInput label="Name" id="email" name="email" />
    </div>
  );
};

export default LoginPage;
