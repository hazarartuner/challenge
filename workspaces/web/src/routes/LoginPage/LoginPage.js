import React from 'react';
import TextInput from 'components/TextInput';

const LoginPage = () => {
  return (
    <div className="login__page">
      <h1>Login Page</h1>
      <TextInput label="Name" id="name" name="name" />
      <TextInput label="Name" id="email" name="email" />
    </div>
  );
};

export default LoginPage;
