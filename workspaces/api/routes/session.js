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
    return res.badRequest({ details: createSessionValidator.errors });
  }

  try {
    const existingSession = await Session.findOne({ where: { slug: sessionObj.slug } });

    if (existingSession) {
      return res.conflict({
        message: `There is already existing session with named "${sessionObj.title}"`,
      });
    }

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

    return res.success(session);
  } catch (error) {
    return res.internalServerError({ details: error });
  }
});

router.get('/list', checkPermission(['MASTER', 'DEVELOPER']), async (req, res) => {
  try {
    const sessions = await Session.findAll();

    return res.success(sessions);
  } catch (error) {
    return res.internalServerError({ details: error });
  }
});

router.get('/:slug', checkPermission(['MASTER', 'DEVELOPER']), async (req, res) => {
  try {
    const session = await Session.findOne({
      where: { slug: req.params.slug },
      include: [Story],
    });

    if (!session) {
      return res.notFound();
    }

    return res.success(session);
  } catch (error) {
    return res.internalServerError({ details: error });
  }
});

module.exports = router;
