import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useForm from 'react-hook-form';
import TextInput from 'components/TextInput';
import TextArea from 'components/TextArea';
import { useHistory } from 'react-router';
import { createSession } from 'redux/ducks/entities/actions';
import generatePath from 'helpers/generatePath';
import './CreateSessionPage.scss';

const CreateSessionPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = ({ title, voterCount, stories }) => {
    setIsLoading(true);
    dispatch(
      createSession({
        title,
        // eslint-disable-next-line radix
        voterCount: parseInt(voterCount),
        stories: stories.split('\n'),
      })
    )
      .then(response => {
        history.push(generatePath('planningForScrumMasterPage', { slug: response.slug }));
      })
      .catch(() => {
        // @todo: Create an app specific notification modal and use it in here
      })
      .finally(() => {
        setIsLoading(false);
      });

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
