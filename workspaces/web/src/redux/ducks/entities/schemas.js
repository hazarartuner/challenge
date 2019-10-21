import { schema } from 'normalizr';

export const storySchema = new schema.Entity('stories');

export const sessionSchema = new schema.Entity('sessions', {
  stories: [storySchema],
});

export const userSchema = new schema.Entity('users');

export const voteSchema = new schema.Entity('votes', {
  user: userSchema,
});
