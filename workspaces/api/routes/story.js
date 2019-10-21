const express = require('express');
const completeStoryValidator = require('../validators/completeStoryValidator');
const { Story } = require('./../models');
const checkPermission = require('./../middlewares/checkPermission');

const router = express.Router();

router.post('/complete/:id', checkPermission(['MASTER']), async (req, res) => {
  const storyObj = {
    ...req.body,
    status: 'VOTED',
  };

  if (!completeStoryValidator(storyObj)) {
    return res.responseHandlers.badRequest(completeStoryValidator.errors);
  }

  try {
    const story = await Story.findByPk(req.params.id);

    if (!story) {
      return res.responseHandlers.notFound('Story not found!');
    }

    if (story.status === 'VOTED') {
      return res.responseHandlers.forbidden('This story has already been completed');
    }

    return res.responseHandlers.success(await story.update(storyObj));
  } catch (error) {
    return res.responseHandlers.internalServerError(error);
  }
});

router.post('/set-active/:id', checkPermission(['MASTER']), async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.id);

    if (!story) {
      return res.responseHandlers.notFound('Story not found!');
    }

    if (story.status === 'VOTED') {
      return res.responseHandlers.forbidden('This story has already been completed');
    }

    // Set sibling stories status as NOT_VOTED
    await Story.update(
      { status: 'NOT_VOTED' },
      { where: { status: 'ACTIVE', sessionId: story.sessionId } }
    );

    // Set current story as ACTIVE
    await Story.update({ status: 'ACTIVE' }, { where: { id: req.params.id } });

    return res.responseHandlers.success();
  } catch (error) {
    return res.responseHandlers.internalServerError(error);
  }
});

module.exports = router;
