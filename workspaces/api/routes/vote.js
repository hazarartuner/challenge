const express = require('express');
const createVoteValidator = require('../validators/createVoteValidator');
const { Vote, Story, User } = require('./../models');
const checkPermission = require('./../middlewares/checkPermission');

const router = express.Router();

router.post('/', checkPermission(['MASTER', 'DEVELOPER']), async (req, res) => {
  const voteObj = {
    ...req.body,
    userId: req.user.id,
  };

  if (!createVoteValidator(voteObj)) {
    return res.badRequest({ details: createVoteValidator.errors });
  }

  try {
    const story = await Story.findByPk(voteObj.storyId);

    if (!story) {
      return res.notFound({ message: 'Story not found!' });
    }

    if (story.status === 'VOTED') {
      return res.forbidden({ message: 'Story has been completed!' });
    }

    const existingVote = await Vote.findOne({
      where: { userId: voteObj.userId, storyId: voteObj.storyId },
    });

    if (existingVote) {
      const vote = await existingVote.update(voteObj);

      return res.success(vote);
    }

    const vote = await Vote.create(voteObj);

    return res.success(vote);
  } catch (error) {
    return res.internalServerError({ details: error });
  }
});

router.get('/list-by-story/:story', checkPermission(['MASTER', 'DEVELOPER']), async (req, res) => {
  try {
    const votes = await Vote.findAll({
      where: {
        storyId: req.params.story,
      },
      include: [User],
    });

    return res.success(votes);
  } catch (error) {
    return res.internalServerError({ details: error });
  }
});

module.exports = router;
