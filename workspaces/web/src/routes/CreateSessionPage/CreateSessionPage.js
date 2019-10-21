import React, { useState } from 'react';
import useForm from 'react-hook-form';
import TextInput from 'components/TextInput';
import TextArea from 'components/TextArea';
import './CreateSessionPage.scss';

const CreateSessionPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = () => {
    setIsLoading(true);

    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="create-session__page">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>New Session</h1>
        <div className="create-session__page__grid">
          <TextInput
            id="title"
            name="title"
            label="Session Name"
            rootClassName="session-name"
            type="text"
            ref={register({ required: true })}
            disabled={isLoading}
            error={errors.title && 'This field is required!'}
          />

          <TextInput
            id="voterCount"
            name="voterCount"
            label="Number of Voters"
            rootClassName="voter-count"
            type="number"
            ref={register({ required: true })}
            disabled={isLoading}
            error={errors.title && 'This field is required!'}
          />

          <TextArea
            id="stories"
            name="stories"
            label="Paste your story list (Each line will be converted as a story)"
            rootClassName="stories"
            ref={register({ required: true })}
            disabled={isLoading}
            error={errors.stories && 'This field is required!'}
          />
        </div>

        <button className="button" type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Start Session'}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionPage;
