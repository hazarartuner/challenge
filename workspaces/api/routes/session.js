const express = require('express');
const slugify = require('slugify');
const createSessionValidator = require('../validators/createSessionValidator');
const { Session, Story } = require('./../models');
const checkPermission = require('./../middlewares/checkPermission');

const router = express.Router();

router.post('/', checkPermission(['MASTER']), async (req, res) => {
  const sessionObj = {
    ...req.body,
    slug: slugify(req.body.title),
  };

  if (!createSessionValidator(sessionObj)) {
    return res.responseHandlers.badRequest(createSessionValidator.errors);
  }

  try {
    const session = await Session.create(
      {
        ...sessionObj,
        stories: req.body.stories.reduce((acc, curr) => {
          acc.push({
            title: curr,
          });

          return acc;
        }, []),
      },
      {
        include: [Story],
      }
    );

    return res.responseHandlers.success(session);
  } catch (error) {
    return res.responseHandlers.internalServerError(error);
  }
});

router.get('/list', checkPermission(['MASTER', 'DEVELOPER']), async (req, res) => {
  try {
    const sessions = await Session.findAll();

    if (!sessions) {
      return res.responseHandlers.notFound();
    }

    return res.responseHandlers.success(sessions);
  } catch (error) {
    return res.responseHandlers.internalServerError(error);
  }
});

router.get('/:id', checkPermission(['MASTER', 'DEVELOPER']), async (req, res) => {
  if (!req.params.id) {
    return res.responseHandlers.badRequest(createSessionValidator.errors);
  }

  try {
    const session = await Session.findByPk(req.params.id, {
      include: [Story],
    });

    if (!session) {
      return res.responseHandlers.notFound();
    }

    return res.responseHandlers.success(session);
  } catch (error) {
    return res.responseHandlers.internalServerError(error);
  }
});

module.exports = router;
