import React from 'react';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../shared/util/validators';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';

import './Auth.css';

const Auth = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const loginHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="auth-form" onSubmit={loginHandler}>
      <Input
        id="email"
        element="input"
        type="text"
        label="e-mail"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid e-mail."
        onInput={inputHandler}
        initialValue={formState.inputs.email.value}
        initialValid={formState.inputs.email.isValid}
      />
      <Input
        id="password"
        element="input"
        type="text"
        label="password"
        validators={[VALIDATOR_MINLENGTH(6)]}
        errorText="Please enter a valid password (min. 6 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.password.value}
        initialValid={formState.inputs.password.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        LOGIN
      </Button>
    </form>
  );
};

export default Auth;
