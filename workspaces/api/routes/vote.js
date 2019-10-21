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
    return res.responseHandlers.badRequest(createVoteValidator.errors);
  }

  try {
    const existingVote = await Vote.findOne({
      where: { userId: voteObj.userId, storyId: voteObj.storyId },
    });

    if (existingVote) {
      const vote = await existingVote.update(voteObj);

      return res.responseHandlers.success(vote);
    }

    if (!(await Story.findByPk(voteObj.storyId))) {
      return res.responseHandlers.notFound('Story not found!');
    }

    const vote = await Vote.create(voteObj);

    return res.responseHandlers.success(vote);
  } catch (error) {
    return res.responseHandlers.internalServerError(error);
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

    if (!votes) {
      return res.responseHandlers.notFound();
    }

    return res.responseHandlers.success(votes);
  } catch (error) {
    return res.responseHandlers.internalServerError(error);
  }
});

module.exports = router;
